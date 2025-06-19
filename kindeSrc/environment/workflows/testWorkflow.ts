import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  fetch,
  onPostAuthenticationEvent,
} from '@kinde/infrastructure'

export const workflowSettings = {
  id: 'postAuthentication',
  trigger: WorkflowTrigger.PostAuthentication,
  bindings: {
    'kinde.accessToken': {},
    'kinde.localization': {},
    'kinde.fetch': {},
    'kinde.env': {},
    'kinde.mfa': {},
    url: {},
  },
}

export default async function TestWorkflow(event: onPostAuthenticationEvent) {
  const accessToken = accessTokenCustomClaims<{
    customerId: string
  }>()
  console.log('Access Token', accessToken)

  console.log({ event })
  const isNewKindeUser = event.context.auth.isNewUserRecordCreated
  console.log({ userId: event.context.user, isNewKindeUser })

  const userId = event.context.user.id

  console.log(event, userId)

  const getM2MAccesstoken = async (): Promise<string> => {
    const url = 'https://auth-staging.kitchenwarehouse.com.au'
    const client_id = '6c0470e618ab41cfb0cde02661df8734'
    const client_secret = 'sfM0FxafvSY3WdhttflhOrsva9Q5T0rB2NkxYMWoHXSG03k8tzkW'
    const audience = 'https://kitchenwarehouse-staging.au.kinde.com/api'

    if (!url || !client_id || !client_secret || !audience) {
      throw new Error('Missing required environment variables')
    }

    const body = new URLSearchParams()
    body.append('grant_type', 'client_credentials')
    body.append('client_id', client_id)
    body.append('client_secret', client_secret)
    body.append('audience', audience)

    const fetchToken = async (): Promise<string> => {
      const response = await fetch(`${url}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
        responseFormat: 'json',
      })

      if (!response.ok) {
        throw new Error(
          `Token request failed: ${response.status} ${response.statusText}`
        )
      }

      console.log('RESPONSE', response)

      const { json: responseData } = response

      console.log('RESPONSE DATA', responseData)

      if (!responseData.access_token) {
        throw new Error('No access token in response')
      }

      return responseData.access_token
    }

    try {
      return await fetchToken()
    } catch (error) {
      throw error
    }
  }

  const getCustomerId = async (): Promise<string | null> => {
    const url = 'https://auth-staging.kitchenwarehouse.com.au'

    if (!url) {
      throw new Error('Missing Kinde URL')
    }

    const makeRequest = async (token: string): Promise<{ json: Response }> => {
      return fetch(`${url}/api/v1/user?id=${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseFormat: 'json',
      })
    }

    const extractCustomerId = (data: {
      properties: [{ key: string; value: string }]
    }): string | null => {
      const customerIdData = data?.properties?.find(
        (property) => property.key === 'customer_id'
      )
      return customerIdData?.value || null
    }

    try {
      // Get initial access token
      let access_token = await getM2MAccesstoken()
      const resp = await makeRequest(access_token)
      let response
      const { json } = resp
      response = json

      // If token is expired/invalid (403), get a fresh token and retry
      if (response.status === 403) {
        access_token = await getM2MAccesstoken()
        const response2 = await makeRequest(access_token)
        const { json } = response2
        response = json
      }

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        )
      }

      const data = response
      return extractCustomerId(
        data as unknown as {
          properties: [{ key: string; value: string }]
        }
      )
    } catch (error) {
      throw error
    }
  }

  const data = await getCustomerId()

  console.log('DATAAA', data)

  // Need email ID (can be in event)
}

// curl --location 'https://auth-staging.kitchenwarehouse.com.au/oauth2/token' \
// --header 'content-type: application/x-www-form-urlencoded' \
// --data-urlencode 'grant_type=client_credentials' \
// --data-urlencode 'client_id=6c0470e618ab41cfb0cde02661df8734' \
// --data-urlencode 'client_secret=sfM0FxafvSY3WdhttflhOrsva9Q5T0rB2NkxYMWoHXSG03k8tzkW' \
// --data-urlencode 'audience=https://kitchenwarehouse-staging.au.kinde.com/api'

//     const response = await fetch(`${url}/oauth2/token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: body.toString(),
//     });

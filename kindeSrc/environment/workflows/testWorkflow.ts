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

  console.log('User ID:', userId)

  // Get customer by Kinde ID
  const customerData = await getCustomerByKindeId(userId)
  console.log('Customer Data:', customerData)

  // const data = await getCustomerId()

  // console.log('DATAAA', data)

  // Need email ID (can be in event)
}

async function getCustomerByKindeId(kindeCustomerId: string) {
  try {
    // Create URLSearchParams for the body
    const requestBody = new URLSearchParams({
      token: 'Bearer xx',
      skipIntrospection: 'true',
      kindeCustomerId: kindeCustomerId
    })

    const response = await fetch('https://kwh-kitchenwarehouse.frontastic.rocks/frontastic/action/account/getcustomerbykindeid', {
      method: 'POST',
      headers: {
        'Commercetools-Frontend-Extension-Version': 'devnarendra',
        'sec-ch-ua-platform': '"macOS"',
        'Referer': 'http://localhost:3000/',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'coFE-Custom-Configuration': '',
        'Frontastic-Session': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjE3YTE4NzUyIn0.eyJhY2NvdW50Ijp7ImVtYWlsIjoibmFyZW5kcmFAY29tcG9zZS5jby5pbiJ9fQ.t8wU5ePhcadLGw5Nm28NWSB4Hj77Fzi_YKBqNTynhvc'
      },
      body: requestBody
    })

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`)
    // }

    const data = await response.json()
    console.log({data})
    return data
  } catch (error) {
    console.error('Error fetching customer by Kinde ID:', error)
    throw error
  }
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

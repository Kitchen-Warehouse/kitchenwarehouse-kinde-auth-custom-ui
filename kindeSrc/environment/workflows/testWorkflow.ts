import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  createKindeAPI,
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

  const kindeAPI = await createKindeAPI(event, {
    clientSecretKey: 'sfM0FxafvSY3WdhttflhOrsva9Q5T0rB2NkxYMWoHXSG03k8tzkW',
    clientIdKey: '6c0470e618ab41cfb0cde02661df8734',
    version: 1,
    clientId: '' as never,
    clientSecret: '' as never,
  })

  const { data } = await kindeAPI.post({
    endpoint: `https://auth-staging.kitchenwarehouse.com.au/oauth2/token`,
    params: {
      grant_type: 'client_credentials',
      client_id: '6c0470e618ab41cfb0cde02661df8734',
      client_secret: 'sfM0FxafvSY3WdhttflhOrsva9Q5T0rB2NkxYMWoHXSG03k8tzkW',
      audience: 'https://kitchenwarehouse-staging.au.kinde.com/api',
    },
  })

  console.log('Data', data)

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

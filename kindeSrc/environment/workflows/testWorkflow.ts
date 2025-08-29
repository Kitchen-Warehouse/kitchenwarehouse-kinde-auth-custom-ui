import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  fetch,
  onPostAuthenticationEvent,
} from '@kinde/infrastructure';

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
};

export default async function TestWorkflow(event: onPostAuthenticationEvent) {
  const accessToken = accessTokenCustomClaims<{
    customerId: string;
  }>();
  console.log('Access Token', accessToken);

  console.log({ event });
  const isNewKindeUser = event.context.auth.isNewUserRecordCreated;
  console.log({ userId: event.context.user, isNewKindeUser });

  const userId = event.context.user.id;

  console.log('User ID:', userId);

  // Get customer by Kinde ID
  const customerData = await getCustomerByKindeId(userId);
  console.log('Customer Data:', customerData);

  // const data = await getCustomerId()

  // console.log('DATAAA', data)

  // Need email ID (can be in event)
}

async function getCustomerByKindeId(kindeCustomerId: string) {
  console.log('Kinde Customer ID:', kindeCustomerId);
  try {
    // Create URLSearchParams for the body
    // const requestBody = new URLSearchParams({
    //   token: 'Bearer xx',
    //   skipIntrospection: 'true',
    //   kindeCustomerId: kindeCustomerId
    // })

    const response = await fetch(
      `https://kwh-kitchenwarehouse.frontastic.rocks/frontastic/action/account/getcustomerbykindeid?kindeCustomerId=${kindeCustomerId}`,
      {
        method: 'POST',
        headers: {
          'Commercetools-Frontend-Extension-Version': 'devnarendra',
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`)
    // }

    // const data = await response.json()
    console.log({ response });
    return response;
  } catch (error) {
    console.error('Error fetching customer by Kinde ID:', error);
    throw error;
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

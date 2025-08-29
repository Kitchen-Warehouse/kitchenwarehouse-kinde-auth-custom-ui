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
  // Add a 15 second delay
  await new Promise(resolve => setTimeout(resolve, 15000));
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
    console.log({ response: response?.data?.data });
    return response;
  } catch (error) {
    console.error('Error fetching customer by Kinde ID:', error);
    throw error;
  }
}

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

  // console.log({ event });
  // const isNewKindeUser = event.context.auth.isNewUserRecordCreated;
  // console.log({ userId: event.context.user, isNewKindeUser });

  const userId = event.context.user.id;
  accessToken.customerId = userId;
  // console.log('User ID:', userId);

  // Get customer by Kinde ID
  // Add a 10 second delay
  console.log('Waiting 10 seconds before API call...');
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  console.log('Starting getCustomerByKindeId call...');
  try {
    const customerData = await getCustomerByKindeId(userId);
    console.log('Customer Data received:', customerData);
  } catch (error) {
    console.error('Failed to get customer data:', error);
  }

  // const data = await getCustomerId()

  // console.log('DATAAA', data)

  // Need email ID (can be in event)
}

async function getCustomerByKindeId(kindeCustomerId: string) {
  console.log('Kinde Customer ID:', kindeCustomerId);
  try {
    console.log('Starting API request...');
    
    const url = `https://kwh-kitchenwarehouse.frontastic.rocks/frontastic/action/account/getcustomerbykindeid?kindeCustomerId=${kindeCustomerId}`;
    console.log('Request URL:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Commercetools-Frontend-Extension-Version': 'devnarendra',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    console.log('Full response object:', response);
    console.log('Response data:', response?.data);
    console.log('Response data.data:', response?.data?.data);
    
    return response;
  } catch (error) {
    console.error('Error fetching customer by Kinde ID:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }
}

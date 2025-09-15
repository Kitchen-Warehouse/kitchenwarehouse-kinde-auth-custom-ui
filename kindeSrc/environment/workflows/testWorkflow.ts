import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  fetch,
  onUserTokenGeneratedEvent,
} from '@kinde/infrastructure';

export const workflowSettings = {
  id: 'userTokenGeneration',
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    'kinde.accessToken': {},
    'kinde.localization': {},
    'kinde.fetch': {},
    'kinde.env': {},
    'kinde.mfa': {},
    url: {},
  },
};

export default async function TestWorkflow(event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    customer_id?: string;

    user_properties?: {
      customer_id?: string;
    };
  }>();
  const userId = event.context.user.id;
  console.log({ userId });

  const customerData = await getCustomerByKindeId(userId);
  console.log({
    customerData,
    customerId: customerData?.data?.customer?.id,
    accessToken: accessToken?.user_properties?.customer_id,
  });
  if (customerData?.data?.customer?.id) {
    accessToken.customer_id = customerData.data.customer.id;
    console.log('Populated the customer id');
  } else {
    console.log('Customer ID not found');
  }
}

async function getCustomerByKindeId(kindeCustomerId: string) {
  try {
    const response = await fetch(
      `https://kwh-kitchenwarehouse.frontastic.rocks/frontastic/action/account/getcustomerbykindeid?kindeCustomerId=${kindeCustomerId}`,
      {
        method: 'POST',
        headers: {
          'Commercetools-Frontend-Extension-Version': 'devnarendra',
        },
      }
    );
    console.log('Response from getCustomerByKindeId:', response);
    return response;
  } catch (error) {
    console.log('Error fetching customer by Kinde ID:', error);
  }
}

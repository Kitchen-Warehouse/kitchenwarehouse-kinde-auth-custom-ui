import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  fetch,
  onUserTokenGeneratedEvent,
  // onPostAuthenticationEvent,
} from '@kinde/infrastructure';

// export const workflowSettings = {
//   id: 'postAuthentication',
//   trigger: WorkflowTrigger.PostAuthentication,
//   bindings: {
//     'kinde.accessToken': {},
//     'kinde.localization': {},
//     'kinde.fetch': {},
//     'kinde.env': {},
//     'kinde.mfa': {},
//     url: {},
//   },
// };

// export default async function TestWorkflow(event: onPostAuthenticationEvent) {
//   const accessToken = accessTokenCustomClaims<{
//     customerId: string;
//   }>();
//   console.log('Access Token', accessToken);

//   // console.log({ event });
//   // const isNewKindeUser = event.context.auth.isNewUserRecordCreated;
//   // console.log({ userId: event.context.user, isNewKindeUser });

//   const userId = event.context.user.id;
//   accessToken.customerId = userId;
//   // console.log('User ID:', userId);

//   // Get customer by Kinde ID
//   const customerData = await getCustomerByKindeId(userId);
//   console.log('Customer Data:', customerData);

//   // const data = await getCustomerId()

//   // console.log('DATAAA', data)

//   // Need email ID (can be in event)
// }

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
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log('Response from getCustomerByKindeId:', response);
    return response;
  } catch (error) {
    console.error('Error fetching customer by Kinde ID:', error);
  }
}

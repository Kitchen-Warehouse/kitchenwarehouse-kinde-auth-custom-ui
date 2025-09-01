import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  // fetch,
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
    customer_id: string;
  }>();
  console.log({ accessToken, event });
  // const userId = event.context.user.id;
  // console.log({ userId });
  
  // console.log('Starting getCustomerByKindeId call...');
  // const customerData = await getCustomerByKindeId(userId);
  // accessToken.customer_id = customerData;
  // console.log({ customerData });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // accessToken.user_properties.customer_id = customerData;
}

// async function getCustomerByKindeId(kindeCustomerId: string) {
//   console.log('Kinde Customer ID:', kindeCustomerId);
//   try {
//     // Create URLSearchParams for the body
//     // const requestBody = new URLSearchParams({
//     //   token: 'Bearer xx',
//     //   skipIntrospection: 'true',
//     //   kindeCustomerId: kindeCustomerId
//     // })

//     const response = await fetch(
//       `https://kwh-kitchenwarehouse.frontastic.rocks/frontastic/action/account/getcustomerbykindeid?kindeCustomerId=${kindeCustomerId}`,
//       {
//         method: 'POST',
//         headers: {
//           'Commercetools-Frontend-Extension-Version': 'devnarendra',
//           Accept: 'application/json',
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );

//     // if (!response.ok) {
//     //   throw new Error(`HTTP error! status: ${response.status}`)
//     // }
//     console.log({ response: response?.data?.data });
//     return response;
//   } catch (error) {
//     console.error('Error fetching customer by Kinde ID:', error);
//     throw error;
//   }
// }

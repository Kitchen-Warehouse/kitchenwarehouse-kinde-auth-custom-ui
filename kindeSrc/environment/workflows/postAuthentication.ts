import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  createKindeAPI,
  getEnvironmentVariable,
  onPostAuthenticationEvent,
  fetch,
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

export default async function handlePostAuth(event: onPostAuthenticationEvent) {
  const isNewKindeUser = event.context.auth.isNewUserRecordCreated;
console.log({isNewKindeUser})
    const M2MToken = await fetch(
      'https://auth-staging.kitchenwarehouse.com.au/oauth2/token',
      {
        method: 'POST',
               responseFormat: 'text',
        headers: {},
      }
    );
console.log('M2MToken', M2MToken);
  // The user has been added to the Kinde user pool for the first time
  if (isNewKindeUser) {
    // Get a token for Kinde management API
    // const kindeAPI = await createKindeAPI(event);

    // const userId = event.context.user.id;


    // Call Kinde user properties API to get UTM tags
    // const { data } = await kindeAPI.get({
    //   endpoint: `users/${userId}/properties`,
    // });
    // const { properties } = data;

    // const propertiesToGetValuesFor = new Set(['customer_id']);

    // function extractMatchingProperties(
    //   props: Array<{ key: string; value: string }>
    // ) {
    //   return props.reduce((acc, property) => {
    //     if (propertiesToGetValuesFor.has(property.key)) {
    //       acc[property.key] = property.value;
    //     }

    //     return acc;
    //   }, {} as Record<string, string>);
    // }

    // Extract the properties that match the keys in the Set
    // const props = extractMatchingProperties(properties);

    // // call user api
    // const { data: user } = await kindeAPI.get({
    //   endpoint: `user?id=${userId}`,
    // });
  }
}

// export default async function TestWorkflow() {
//   const accessToken = accessTokenCustomClaims<{
//     customerId: string;
//   }>();

//   accessToken.customerId = 'test-customerId'
// }

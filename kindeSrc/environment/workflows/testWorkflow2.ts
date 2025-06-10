import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  createKindeAPI,
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
//   const accessToken = accessTokenCustomClaims<{
//     customerId: string;
//   }>();
  console.log({event})
  const isNewKindeUser = event.context.auth.isNewUserRecordCreated;
  console.log({userId:  event.context.user,isNewKindeUser})
  const body = new URLSearchParams();
  const userId = event.context.user.id
  body.append('userId', userId);
  
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("client_id", "6c0470e618ab41cfb0cde02661df8734");
  urlencoded.append("client_secret", "sfM0FxafvSY3WdhttflhOrsva9Q5T0rB2NkxYMWoHXSG03k8tzkW");
  urlencoded.append("audience", "https://kitchenwarehouse-staging.au.kinde.com/api");
  const requestOptions = {
      method: "POST" as "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Methods": "*"
        },
        body: urlencoded,
        redirect: "follow"
    };
    const kindeAPI = await createKindeAPI(event);
console.log({isNewKindeUser, kindeAPI})
  const { data } = await kindeAPI.post({
      endpoint: `https://auth-staging.kitchenwarehouse.com.au/oauth2/token`,
    });
    console.log({data})
//     const M2MToken = await fetch(
//       'https://auth-staging.kitchenwarehouse.com.au/oauth2/token',
//       requestOptions
//     );
// console.log('M2MToken', M2MToken.data);
//   console.log('response', response?.data);
//   console.log({response})

//   accessToken.customerId = response?.data;
}
import {
  // WorkflowTrigger,
  // accessTokenCustomClaims,
  createKindeAPI,
} from '@kinde/infrastructure';

// export const workflowSettings = {
//   id: 'addAccessTokenClaim',
//   trigger: WorkflowTrigger.UserTokenGeneration,
//   bindings: {
//     'kinde.accessToken': {},
//     'kinde.localization': {},
//     'kinde.fetch': {},
//     'kinde.env': {},
//     'kinde.mfa': {},
//     url: {},
//   },
// };

export const workflowSettings = {
  id: "m2mTokenGeneration",
  name: "M2M custom claims",
  failurePolicy: {
    action: "stop",
  },
  trigger: "m2m:token_generation",
  bindings: {
    "kinde.m2mToken": {}, // required to modify M2M access token
    "kinde.fetch": {}, // Required for external API calls
    "kinde.env": {}, // required to access your environment variables
    url: {}, // required for url params
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function TestWorkflow(event:any) {
  // const accessToken = accessTokenCustomClaims<{
  //   email: string;
  //   user_properties: {
  //     customer_id: {
  //       v: string;
  //     };
  //   };
  // }>();

  const kindeAPI = await createKindeAPI(event);

  const { data } = await kindeAPI.get({
    endpoint: `applications/6c0470e618ab41cfb0cde02661df8734/properties`,
  });
  const {appProperties} = data;

  console.log({appProperties})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const { data }: any = await fetch(
  //   'https://get-kwh-customer-by-email.netlify.app/get-user',
  //   {
  //     method: 'GET',
  //     body: JSON.stringify({
  //       email: accessToken.email,
  //     }),
  //   }
  // );

  // console.log('response', data);
  // // accessToken.email

  // accessToken.user_properties.customer_id.v = data?.body?.id;
}

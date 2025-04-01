import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  createKindeAPI,
} from '@kinde/infrastructure';

export const workflowSettings = {
  id: 'addAccessTokenClaim',
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function TestWorkflow(event:any) {
  const accessToken = accessTokenCustomClaims<{
    email: string;
    user_properties: {
      customer_id: {
        v: string;
      };
    };
  }>();

  const kindeAPI = await createKindeAPI(event);

  const { data } = await kindeAPI.get({
    endpoint: `applications/${event.context.application.clientId}/properties`,
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

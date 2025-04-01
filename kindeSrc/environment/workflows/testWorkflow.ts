import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  onUserTokenGeneratedEvent,
  fetch,
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

export default async function TestWorkflow(event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    email: string;
    user_properties: {
      customer_id: {
        v: string;
      };
    };
  }>();

  const body = new URLSearchParams();
  body.append('email', accessToken.email);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data }: any = await fetch(
    'https://get-kwh-customer-by-email.netlify.app/get-user',
    {
      method: 'GET',
      headers:{},
      body
    }
  );

  console.log('response', data?.body?.id,accessToken);
  // // accessToken.email

  accessToken.user_properties.customer_id.v = data?.body?.id;
}

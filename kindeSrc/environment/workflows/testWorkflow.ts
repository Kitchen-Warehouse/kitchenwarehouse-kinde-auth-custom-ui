import {
  WorkflowTrigger,
  accessTokenCustomClaims,
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

export default async function TestWorkflow() {
  const accessToken = accessTokenCustomClaims<{
    email: string;
    customerId: string;
  }>();

  const body = new URLSearchParams();
  body.append('email', accessToken.email);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await fetch(
    'https://get-kwh-customer-by-email.netlify.app/get-user',
    {
      method: 'POST',
      responseFormat: 'text',
      headers: {},
      body,
    }
  );

  const res = await data.json()

  console.log('response', res?.body?.id, res);
  // // accessToken.email

  accessToken.customerId = res?.body?.id;
}

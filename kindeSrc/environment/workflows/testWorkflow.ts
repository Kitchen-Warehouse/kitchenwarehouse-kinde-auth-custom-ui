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

  console.log('response', data?.data?.id);
  console.log({data})
  // // accessToken.email

  accessToken.customerId = data?.data?.id;
}

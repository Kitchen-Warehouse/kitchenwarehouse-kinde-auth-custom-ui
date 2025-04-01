import {
  WorkflowTrigger,
  accessTokenCustomClaims,
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
    user_properties: {
      customer_id: {
        v: string;
      };
    };
  }>();

  const response = await fetch(
    'https://get-kwh-customer-by-email.netlify.app/get-user',
    {
      method: 'GET',
      body: JSON.stringify({
        email: accessToken.email,
      }),
    }
  );

  const res: {
    body: { id: string };
  } = await response.json();

  console.log('response', res);
  // accessToken.email

  accessToken.user_properties.customer_id.v = res?.body?.id;
}

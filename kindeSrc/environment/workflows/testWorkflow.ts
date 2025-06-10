import {
  WorkflowTrigger,
  accessTokenCustomClaims,
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
  const accessToken = accessTokenCustomClaims<{
    customerId: string;
  }>();
  console.log({event})
  const isNewKindeUser = event.context.auth.isNewUserRecordCreated;
  console.log({userId:  event.context.user,isNewKindeUser})
  const body = new URLSearchParams();
  const userId = event.context.user.id
  body.append('userId', userId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await fetch(
    'https://get-kwh-customer-by-email.netlify.app/get-user',
    {
      method: 'POST',
      responseFormat: 'text',
      headers: {},
      body,
    }
  );
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
  console.log('response', response?.data);
  console.log({response})

  accessToken.customerId = response?.data;
}
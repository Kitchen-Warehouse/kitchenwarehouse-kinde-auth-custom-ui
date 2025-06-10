import { accessTokenCustomClaims, onUserTokenGeneratedEvent, WorkflowTrigger } from '@kinde/infrastructure';

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

export default async function TestWorkflow1(event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    customer_id: string;
  }>();
console.log({accessToken})
  accessToken.customer_id = '12345';
}

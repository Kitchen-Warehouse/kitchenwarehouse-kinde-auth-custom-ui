import { WorkflowTrigger, idTokenCustomClaims } from '@kinde/infrastructure';

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
  const idToken = idTokenCustomClaims<{
    customerId: string;
  }>();
  console.log(idToken);
  idToken.customerId = '03dead9c-42fe-4f54-9638-d34ecfce694a';
}

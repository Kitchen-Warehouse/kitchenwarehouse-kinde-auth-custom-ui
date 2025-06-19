import {
  WorkflowTrigger,
  accessTokenCustomClaims,
  createKindeAPI,
  fetch,
  onPostAuthenticationEvent,
} from '@kinde/infrastructure'

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
}

export default async function TestWorkflow(event: onPostAuthenticationEvent) {
  //   const accessToken = accessTokenCustomClaims<{
  //     customerId: string;
  //   }>();
  console.log({ event })
  const isNewKindeUser = event.context.auth.isNewUserRecordCreated
  console.log({ userId: event.context.user, isNewKindeUser })

  const userId = event.context.user.id

  console.log(event, userId)
  // Need email ID (can be in event)
}

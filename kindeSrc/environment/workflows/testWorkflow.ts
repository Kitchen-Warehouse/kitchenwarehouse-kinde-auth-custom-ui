import { accessTokenCustomClaims, WorkflowTrigger } from "@kinde/infrastructure";

export const workflowSettings = {
    id: "addAccessTokenClaim",
    trigger: WorkflowTrigger.UserTokenGeneration,
    bindings: {
      "kinde.accessToken": {},
      "kinde.localization": {},
      "kinde.fetch": {},
      "kinde.env": {},
      "kinde.mfa": {},
      url: {},
    },
  };

  export default async function TestWorkflow() {
    const accessToken = accessTokenCustomClaims<{
        customerId: string
    }>()

    accessToken.customerId = "03dead9c-42fe-4f54-9638-d34ecfce694a"
  }
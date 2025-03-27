import { WorkflowTrigger, idTokenCustomClaims } from "@kinde/infrastructure";

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
    const idToken = idTokenCustomClaims()
    console.log({idToken})
  }
import { accessTokenCustomClaims, onUserTokenGeneratedEvent } from '@kinde/infrastructure';

export default async function TestWorkflow1 (event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    customer_id: string;
  }>();

  accessToken.customer_id = '12345';
}

import { CognitoUserPool } from 'amazon-cognito-identity-js';
const userPool = new CognitoUserPool({
	ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
	UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID
});

export { userPool };

import { CognitoUserPool } from 'amazon-cognito-identity-js';
const userPool = new CognitoUserPool({
	ClientId: '4fv420murkncbh9gvog6pm2b1r',
	UserPoolId: 'us-east-2_RvFhxZeny'
});

export { userPool };

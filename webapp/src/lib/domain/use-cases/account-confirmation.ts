import { userPool } from '$lib/infrastructure/aws-cognito';
import { CognitoUser, type ICognitoUserData } from 'amazon-cognito-identity-js';

export default function accountConfirmation(code: string, email: string) {
	return new Promise((resolve, reject) => {
		const userData: ICognitoUserData = {
			Pool: userPool,
			Username: email
		};
		const cognitoUser = new CognitoUser(userData);

		cognitoUser.confirmRegistration(code, true, (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(result);
		});
	});
}

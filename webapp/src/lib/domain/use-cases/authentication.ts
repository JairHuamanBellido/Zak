import {
	AuthenticationDetails,
	CognitoUser,
	type ICognitoUserData
} from 'amazon-cognito-identity-js';
import type { IAuthentication } from '../interface/user.interface';
import { userPool } from '$lib/infrastructure/aws-cognito';
import type { Cookies } from '@sveltejs/kit';

export default function authenticaton({ email, password }: IAuthentication, cookies: Cookies) {
	return new Promise<{ isSuccess: boolean }>((resolve, reject) => {
		const userData: ICognitoUserData = {
			Pool: userPool,
			Username: email
		};
		const authenticationDetails = new AuthenticationDetails({
			Username: email,
			Password: password
		});

		const cognitoUser = new CognitoUser(userData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: (result) => {
				cookies.set('token', result.getIdToken().getJwtToken());

				resolve({ isSuccess: true });
			},
			onFailure: (err) => {
				reject(err);
			}
		});
	});
}

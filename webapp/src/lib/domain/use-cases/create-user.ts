import { userPool } from '$lib/infrastructure/aws-cognito';
import type { ICreateUser } from '../interface/user.interface';
import { CognitoUserAttribute, type ISignUpResult } from 'amazon-cognito-identity-js';

export default function createUserUseCase(user: ICreateUser) {
	return new Promise<ISignUpResult>((resolve, reject) => {
		const attributeEmail = new CognitoUserAttribute({ Name: 'email', Value: user.email });
		const attributeLastname = new CognitoUserAttribute({
			Name: 'family_name',
			Value: user.lastname
		});
		const attributeName = new CognitoUserAttribute({ Name: 'given_name', Value: user.name });
		const attributeGender = new CognitoUserAttribute({ Name: 'gender', Value: user.gender ?? '' });

		userPool.signUp(
			user.email,
			user.password,
			[attributeEmail, attributeLastname, attributeName, attributeGender],
			[],

			function (err, result) {
				if (err) {
					reject(err);
					return;
				}

				resolve(result as ISignUpResult);
			}
		);
	});
}

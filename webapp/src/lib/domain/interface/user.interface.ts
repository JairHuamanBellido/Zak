export interface ICreateUser {
	readonly gender?: string;
	readonly name: string;
	readonly email: string;
	readonly lastname: string;
	readonly password: string;
}

export interface IAuthentication {
	readonly email: string;
	readonly password: string;
}

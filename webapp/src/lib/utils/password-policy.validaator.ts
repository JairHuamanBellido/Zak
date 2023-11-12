import PasswordValidator from 'password-validator';

const passwordPolicy = new PasswordValidator();

passwordPolicy.is().min(8);
passwordPolicy.is().lowercase();
passwordPolicy.is().uppercase();
passwordPolicy.is().symbols();
passwordPolicy.is().digits(1);

const passwordIssues = (password: string): any[] => {
	return passwordPolicy.validate(password, { list: true }) as any[];
};

export { passwordIssues };

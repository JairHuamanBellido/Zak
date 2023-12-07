import { accountConfirmationSchema } from '$lib/domain/schema/account-confirmation.schema';
import { createUserSchema } from '$lib/domain/schema/create-user.schema';
import accountConfirmation from '$lib/domain/use-cases/account-confirmation';
import createUserUseCase from '$lib/domain/use-cases/create-user';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
export const load: PageServerLoad = async () => {
	const registerForm = await superValidate(createUserSchema);
	const accountConfirmationForm = await superValidate(accountConfirmationSchema);
	return {
		registerForm,
		accountConfirmationForm
	};
};
export const actions: Actions = {
	register: async (event) => {
		const form = await superValidate(event, createUserSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const user = await createUserUseCase(form.data);

			return {
				form,
				isSuccess: true,
				displayForm: 'ACCOUNT_CONFIRMATION',
				email: user.user.getUsername()
			};
		} catch (error) {
			return {
				form,
				error: new Error(error as string).message,
				isError: true,
				displayForm: 'SIGN_UP'
			};
		}
	},
	submitCode: async (event) => {
		const form = await superValidate(event, accountConfirmationSchema);
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await accountConfirmation(form.data.code, form.data.email);

			return { isSuccess: true, form, displayForm: 'FINAL' };
		} catch (error) {
			return {
				form,
				error: new Error(error as string).message,
				isError: true,
				displayForm: 'ACCOUNT_CONFIRMATION'
			};
		}
	}
};

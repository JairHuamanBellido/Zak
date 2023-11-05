import { createUserSchema } from '$lib/domain/schema/create-user.schema';
import createUserUseCase from '$lib/domain/use-cases/create-user';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
export const load: PageServerLoad = () => {
	return {
		form: superValidate(createUserSchema)
	};
};
export const actions: Actions = {
	default: async (event) => {
		console.log('llamanod');
		const form = await superValidate(event, createUserSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await createUserUseCase(form.data);

			return {
				form,
				isSuccess: true
			};
		} catch (error) {
			console.log(new Error(error as string).message);
			return {
				form,
				error: new Error(error as string).message,
				isError: true
			};
		}
	}
};

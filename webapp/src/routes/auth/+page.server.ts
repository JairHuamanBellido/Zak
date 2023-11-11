import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad, Actions } from './$types';
import { authenticationSchema } from '$lib/domain/schema/authentication.schema';
import { fail, redirect } from '@sveltejs/kit';
import authenticaton from '$lib/domain/use-cases/authentication';

export const load: PageServerLoad = async () => {
	const form = await superValidate(authenticationSchema);

	return { form };
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, authenticationSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { email, password } = form.data;
		let isSuccess = false;

		try {
			await authenticaton({ email, password }, event.cookies);

			isSuccess = true;
		} catch (error: any) {
			isSuccess = false;
		} finally {
			if (isSuccess) {
				throw redirect(303, '/');
			}

			return { form, isError: true, error: 'Invalid Credentials' };
		}
	}
};

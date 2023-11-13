import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { createStockPurchasesSchema } from '$lib/domain/schema/create-stock-purchases.schema';
import { fail, redirect } from '@sveltejs/kit';
import { API_BASE_URL } from '$lib/core/constant';

export const load: PageServerLoad = async () => {
	const form = await superValidate(createStockPurchasesSchema);

	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, createStockPurchasesSchema);

		let isSuccess = true;

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await fetch(`${API_BASE_URL}/stock-purchases`, {
				method: 'POST',
				body: JSON.stringify(form.data),
				headers: { Authorization: event.cookies.get('token') ?? '' }
			});

			isSuccess = true;
		} catch (error) {
			console.log(error);
			isSuccess = false;
		} finally {
			if (isSuccess) {
				throw redirect(303, '/dashboard/investments');
			}

			return { form, isError: true };
		}
	}
};

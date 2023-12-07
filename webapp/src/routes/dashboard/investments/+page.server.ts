import { API_BASE_URL } from '$lib/core/constant';
import type { IStockPurchasesAPI } from '$lib/domain/interface/stock-purchase.interface';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const jwtToken = cookies.get('token') ?? '';

	const stocksPurchases: IStockPurchasesAPI[] = await fetch(`${API_BASE_URL}/stock-purchases`, {
		method: 'GET',
		headers: { Authorization: jwtToken }
	}).then((res) => res.json());

	return { stocksPurchases };
};

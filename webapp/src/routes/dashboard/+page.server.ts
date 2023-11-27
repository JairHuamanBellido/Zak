import { API_BASE_URL } from '$lib/core/constant';
import type { IPortfolio } from '$lib/domain/interface/portfolio.interface';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const jwtToken = cookies.get('token') ?? '';

	const portfolio: IPortfolio = await fetch(
		`${API_BASE_URL}/portfolio-summary/portfolio-valuation`,
		{
			method: 'GET',
			headers: { Authorization: jwtToken }
		}
	).then((res) => res.json());

	return { portfolio };
};

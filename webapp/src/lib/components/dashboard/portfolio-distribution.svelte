<script lang="ts">
	import { API_BASE_URL } from '$lib/core/constant';
	import type { IPortfolioDistribution } from '$lib/domain/interface/portfolio.interface';
	import { jwtTokenStore } from '$lib/store/jwt-token.store';
	import { get } from 'svelte/store';
	import PieChart from './pie-chart.svelte';

	async function fetchPortfolioDistribution() {
		const portfolioDistribution: IPortfolioDistribution[] = await fetch(
			`${API_BASE_URL}/portfolio-summary/investment-by-stock`,
			{ headers: { Authorization: get(jwtTokenStore) } }
		).then((res) => res.json());

		return portfolioDistribution;
	}
</script>

{#await fetchPortfolioDistribution()}
	<p>Loading...</p>
{:then portfolioDistribution}
	<PieChart data={portfolioDistribution} />
{/await}

<script lang="ts">
	import { API_BASE_URL } from '$lib/core/constant';
	import type { IPortfolioDistribution } from '$lib/domain/interface/portfolio.interface';
	import { jwtTokenStore } from '$lib/store/jwt-token.store';
	import { get } from 'svelte/store';
	import PieChart from './pie-chart.svelte';
	import { TypographyH3, TypographyMuted } from '../ui/typography';
	import { Skeleton } from '../ui/skeleton';

	async function fetchPortfolioDistribution() {
		const portfolioDistribution: IPortfolioDistribution[] = await fetch(
			`${API_BASE_URL}/portfolio-summary/investment-by-stock`,
			{ headers: { Authorization: get(jwtTokenStore) } }
		).then((res) => res.json());

		return portfolioDistribution;
	}
</script>

<div class="w-full h-[400px] relative">
	<TypographyH3>Balance</TypographyH3>
	<TypographyMuted class="mt-1 text-base text-muted-foreground  font-normal mb-4"
		>Discover how your investements are balanced</TypographyMuted
	>

	{#await fetchPortfolioDistribution()}
		<div class="w-full relative flex items-center gap-x-4">
			<Skeleton class="w-[200px] h-[200px] rounded-full" />
			<div class="space-y-2">
				<Skeleton class="w-[100px] rounded h-4" />
				<Skeleton class="w-[100px] rounded h-4" />
				<Skeleton class="w-[100px] rounded h-4" />
				<Skeleton class="w-[100px] rounded h-4" />
			</div>
		</div>
	{:then portfolioDistribution}
		<PieChart data={portfolioDistribution} />
	{/await}
</div>

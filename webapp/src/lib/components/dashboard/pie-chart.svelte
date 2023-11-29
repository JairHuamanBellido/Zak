<script lang="ts">
	import { PieChart } from '$lib/application/PieChart';
	import { onMount } from 'svelte';
	import { TypographyH3 } from '../ui/typography';
	import type { IPortfolioDistribution } from '$lib/domain/interface/portfolio.interface';

	export let data: IPortfolioDistribution[];
	let boxWidth: number = 0;
	let boxHeight: number = 0;

	let pieChart: PieChart;

	onMount(() => {
		pieChart = new PieChart('#pie-chart-container', data, boxWidth, boxHeight);
		pieChart.display();
	});
</script>

<div class="w-full h-full relative">
	<TypographyH3 class="border-none  font-normal mb-4">Diversification</TypographyH3>

	<div
		bind:clientHeight={boxHeight}
		bind:clientWidth={boxWidth}
		style="width: 200px; height: 200px;"
		id="pie-chart-container"
		class="relative"
	/>
</div>

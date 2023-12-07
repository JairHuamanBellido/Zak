<script lang="ts">
	import { PieChart } from '$lib/application/PieChart';
	import { onMount } from 'svelte';
	import { TypographyH3, TypographyMuted, TypographyParagraph } from '../ui/typography';
	import type { IPortfolioDistribution } from '$lib/domain/interface/portfolio.interface';

	export let data: IPortfolioDistribution[];
	let boxWidth: number = 0;
	let boxHeight: number = 0;

	let pieChart: PieChart;

	onMount(() => {
		pieChart = new PieChart('#pie-chart-container', data, boxWidth, boxHeight);
		pieChart.display();
	});

	// $: if (boxHeight && boxWidth && pieChart) pieChart.update(boxWidth, boxHeight);
	// $: console.log(boxWidth,boxHeight)
</script>

<div class="flex gap-x-4 w-full relative h-[200px] items-center">
	<div
		bind:clientHeight={boxHeight}
		bind:clientWidth={boxWidth}
		id="pie-chart-container"
		class="relative w-[200px] max-[400px] h-[200px]"
	/>

	<div class="space-y-2">
		{#each data as stock}
			<div class="flex gap-x-1 items-center">
				<div
					style="background: hsl(var(--primary) / {stock.percentageOfTotal / 100});"
					class={`w-4 h-4 rounded-full`}
				/>
				<TypographyParagraph>
					{stock.symbol} - {stock.percentageOfTotal}%
				</TypographyParagraph>
			</div>
		{/each}
	</div>
</div>

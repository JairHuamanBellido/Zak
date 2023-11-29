<script lang="ts">
	import {
		TypographyH1,
		TypographyMuted,
		TypographyParagraph
	} from '$lib/components/ui/typography';
	import { onMount } from 'svelte';
	import { Chart } from '$lib/application/Chart';
	import type { PageData } from './$types';
	import { TrendingUp } from 'lucide-svelte';
	import LatestTransactionsTable from '$lib/components/dashboard/latest-transactions-table.svelte';

	export let data: PageData;

	let chart: Chart;

	$: if (boxWidth && chart) chart.updateChart(boxWidth);

	onMount(() => {
		chart = new Chart('#svg-container', data.portfolio.timeSeriesData, boxWidth);

		chart.buildPath();
		// chart.buidlXAsis();
		chart.buildYAsis();
		chart.addToolTip();
	});

	let boxWidth: number = 0;
</script>

<div>
	<TypographyH1 class="font-light text-4xl">Welcome Jair!</TypographyH1>
</div>

<div>
	<div class="mt-12 flex space-x-40 items-center">
		<div>
			<TypographyMuted class="mb-1">Invested Value</TypographyMuted>
			<TypographyParagraph class="mb-1 text-3xl"
				>${data.portfolio.totalInvestment}</TypographyParagraph
			>
		</div>
		<div>
			<TypographyMuted class="mb-1">Overall Return</TypographyMuted>
			<div class="flex items-center space-x-4">
				<TypographyParagraph class="mb-1 text-3xl"
					>${data.portfolio.currentBalance}</TypographyParagraph
				>

				<TypographyParagraph
					class="text-green-600 bg-green-100/60  px-2 rounded  flex gap-x-2 items-center"
				>
					<TrendingUp />
					{data.portfolio.performance}%
				</TypographyParagraph>
			</div>
		</div>
	</div>

	<div bind:clientWidth={boxWidth} style="height: 500px;" id="svg-container" class="relative" />
</div>
<div class="w-full flex items-center space-x-12">
	<div class="w-3/4">
		<LatestTransactionsTable />
	</div>
	<div class="w-1/4">A pie chart</div>
</div>

<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { TypographyH1, TypographyParagraph } from '$lib/components/ui/typography';
	import Link from '$lib/components/ui/typography/link.svelte';
	import InvestmentTable from '$lib/components/investments/table/investment-table.svelte';

	export let data: PageData;
</script>

<header class="flex w-full items-center justify-between">
	<TypographyH1 class="lg:text-4xl">Investments</TypographyH1>
	<Button>
		<Link class="no-underline" href="/dashboard/investments/create">+ Create</Link>
	</Button>
</header>

<div class="mt-8">
	<InvestmentTable stockPurchases={data.stocksPurchases} />
</div>

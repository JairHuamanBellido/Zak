<script lang="ts">
	import type { PageData } from './$types';
	import CreateStockPurchases from '$lib/components/investments/form/create-stock-purchases.svelte';
	import { TypographyH3, TypographyLink } from '$lib/components/ui/typography';
	import { ArrowLeft } from 'lucide-svelte';

	export let data: PageData;
</script>

<div class="flex space-x-2 items-center">
	<TypographyLink class="no-underline" href="/dashboard/investments">
		<ArrowLeft />
	</TypographyLink>
	<TypographyH3>New Stock Purchases</TypographyH3>
</div>

<div class="mt-8 w-[600px]">
	<CreateStockPurchases form={data.form} />
</div>

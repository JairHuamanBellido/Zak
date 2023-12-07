<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { API_BASE_URL } from '$lib/core/constant';
	import type { IStockPurchasesAPI } from '$lib/domain/interface/stock-purchase.interface';
	import { get } from 'svelte/store';
	import { TypographyH3, TypographyMuted, TypographyParagraph } from '../ui/typography';
	import { jwtTokenStore } from '$lib/store/jwt-token.store';
	import { cn, formatDateDefault, roundNumberTwoDecimals } from '$lib/utils/utils';
	import { Skeleton } from '../ui/skeleton';

	async function fetchLatestTransaction() {
		const latestTransactions: IStockPurchasesAPI[] = await fetch(
			`${API_BASE_URL}/portfolio-summary/latest-transactions`,
			{ headers: { Authorization: get(jwtTokenStore) } }
		).then((res) => res.json());

		return latestTransactions;
	}
</script>

<TypographyH3>Latest purchase</TypographyH3>
<TypographyMuted class="mt-1 text-base text-muted-foreground  font-normal mb-4"
	>Check your latest purchases</TypographyMuted
>

{#await fetchLatestTransaction()}
	<div class="space-y-2">
		<Skeleton class="w-full rounded h-[24px]" />
		<Skeleton class="w-full rounded h-[24px]" />
		<Skeleton class="w-full rounded h-[24px]" />
		<Skeleton class="w-full rounded h-[24px]" />
	</div>
{:then transactions}
	<Table.Root>
		<Table.Header>
			<Table.Row class="hover:bg-transparent">
				<Table.Head class=" text-foreground text-sm uppercase">Stock</Table.Head>
				<Table.Head class=" text-foreground text-sm uppercase">Date</Table.Head>
				<Table.Head class=" text-foreground text-sm uppercase">Shares</Table.Head>
				<Table.Head class=" text-foreground text-sm uppercase">Purchase</Table.Head>
				<Table.Head class=" text-foreground text-sm uppercase">Change (%)</Table.Head>
				<Table.Head class=" text-foreground text-sm uppercase">Change ($)</Table.Head>
				<Table.Head class=" text-foreground text-sm uppercase">Cost</Table.Head>
				<Table.Head class=" text-foreground text-sm uppercase">Value</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each transactions as transaction}
				<Table.Row class=" text-foreground  hover:bg-transparent">
					<Table.Cell class="font-semibold">{transaction.symbol}</Table.Cell>
					<Table.Cell class="text-muted-foreground"
						>{formatDateDefault(new Date(transaction.date))}</Table.Cell
					>
					<Table.Cell class="text-muted-foreground">{transaction.quantity}</Table.Cell>
					<Table.Cell class="text-muted-foreground">{transaction.price}</Table.Cell>
					<Table.Cell
						class={cn(
							{
								'text-green-600': transaction.performance > 0,
								'text-red-500': transaction.performance < 0,
								'text-foreground': transaction.performance === 0
							},
							'font-semibold '
						)}
					>
						{transaction.performance}%
					</Table.Cell>
					<Table.Cell class="text-muted-foreground">{transaction.price}</Table.Cell>
					<Table.Cell class="text-muted-foreground">{transaction.totalCost}</Table.Cell>
					<Table.Cell class="text-muted-foreground">
						{roundNumberTwoDecimals(
							transaction.totalCost + transaction.totalCost * (transaction.performance / 100)
						)}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/await}

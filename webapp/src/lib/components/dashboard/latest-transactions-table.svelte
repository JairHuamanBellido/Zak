<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { API_BASE_URL } from '$lib/core/constant';
	import type { IStockPurchasesAPI } from '$lib/domain/interface/stock-purchase.interface';
	import { get } from 'svelte/store';
	import { TypographyH3, TypographyParagraph } from '../ui/typography';
	import { jwtTokenStore } from '$lib/store/jwt-token.store';
	import { cn, formatDateDefault, roundNumberTwoDecimals } from '$lib/utils/utils';
	import { browser } from '$app/environment';

	async function fetchLatestTransaction() {
		const latestTransactions: IStockPurchasesAPI[] = await fetch(
			`${API_BASE_URL}/portfolio-summary/latest-transactions`,
			{ headers: { Authorization: get(jwtTokenStore) } }
		).then((res) => res.json());

		return latestTransactions;
	}
</script>

{#await fetchLatestTransaction()}
	<p>Cargando...</p>
{:then transactions}
	<div>
		<TypographyH3 class="border-none  font-normal mb-4">My lastest transactions</TypographyH3>

		<Table.Root class="rounded overflow-hidden">
			<Table.Header>
				<Table.Row class="hover:bg-transparent">
					<Table.Head class="uppercase">Date</Table.Head>
					<Table.Head class="uppercase">Stock</Table.Head>
					<Table.Head class="uppercase">Total Purchase Cost</Table.Head>
					<Table.Head class="uppercase">Performance</Table.Head>
					<Table.Head class="uppercase text-right">Current Value</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each transactions as transaction}
					<Table.Row class="text-foreground  hover:bg-transparent">
						<Table.Cell>{formatDateDefault(new Date(transaction.date))}</Table.Cell>
						<Table.Cell>{transaction.symbol}</Table.Cell>
						<Table.Cell>{transaction.totalCost}</Table.Cell>
						<Table.Cell
							class={cn(
								{
									'text-green-600  bg-green-50': transaction.performance > 0,
									'text-red-500 bg-red-50': transaction.performance < 0,
									'text-foreground': transaction.performance === 0
								},
								'font-semibold text-center rounded w-[100px]'
							)}
						>
							{transaction.performance}%
						</Table.Cell>
						<Table.Cell class="text-right">
							<TypographyParagraph>
								{roundNumberTwoDecimals(
									transaction.totalCost + transaction.totalCost * (transaction.performance / 100)
								)}
							</TypographyParagraph>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{/await}

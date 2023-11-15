<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { IStockPurchasesAPI } from '$lib/domain/interface/stock-purchase.interface';

	export let stockPurchases: IStockPurchasesAPI[];
</script>

<Table.Root>
	<Table.Header class="bg-muted/30">
		<Table.Row class="hover:bg-none">
			<Table.Head>Stock</Table.Head>
			<Table.Head>Price ($)</Table.Head>
			<Table.Head>Quantity</Table.Head>
			<Table.Head>Total ($)</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each stockPurchases as stockPurchase}
			<Table.Row class="text-foreground">
				<Table.Cell class="font-semibold">
					{stockPurchase.symbol}
				</Table.Cell>
				<Table.Cell class="text-foreground/80">
					{stockPurchase.price}
				</Table.Cell>
				<Table.Cell class="text-foreground/80">
					{stockPurchase.quantity}
				</Table.Cell>
				<Table.Cell class="text-foreground/80">
					{stockPurchase.totalCost}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>

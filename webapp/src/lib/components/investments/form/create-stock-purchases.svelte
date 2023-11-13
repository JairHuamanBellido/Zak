<script lang="ts">
	import {
		createStockPurchasesSchema,
		type FormCreateStockPurchasesSchema
	} from '$lib/domain/schema/create-stock-purchases.schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';

	export let form: SuperValidated<FormCreateStockPurchasesSchema>;
</script>

<Form.Root
	class="space-y-4"
	let:formValues
	let:submitting
	method="post"
	{form}
	schema={createStockPurchasesSchema}
	let:config
>
	<Form.Field {config} name="symbol">
		<Form.Item>
			<Form.Label>Stock(Symbol)</Form.Label>
			<Form.Input placeholder="VOO, SCHD, APPL" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="date">
		<Form.Item>
			<Form.Label>Date</Form.Label>
			<Form.Input type="date" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="price">
		<Form.Item>
			<Form.Label>Price</Form.Label>
			<Form.Input step="0.01" type="number" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="quantity">
		<Form.Item>
			<Form.Label>Quantity</Form.Label>
			<Form.Input type="number" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="currency">
		<Form.Item>
			<Form.Label>Currency</Form.Label>
			<Form.Input placeholder="USD, EURO, YEN" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Button
		disabled={!formValues.currency ||
			!formValues.date ||
			!formValues.price ||
			!formValues.quantity ||
			!formValues.symbol ||
			submitting}
	>
		{submitting ? 'Loading' : 'Create'}
	</Form.Button>
</Form.Root>

<script lang="ts">
	import FormError from '$lib/components/error/form-error.svelte';
	import * as Form from '$lib/components/ui/form';
	import {
		accountConfirmationSchema,
		type FormAccountConfirmationSchema
	} from '$lib/domain/schema/account-confirmation.schema';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let email: string;
	export let form: SuperValidated<FormAccountConfirmationSchema>;
	export let error: string;
	export let isError: boolean | undefined;
	form.data.email = email;
</script>

<Form.Root
	method="post"
	class="space-y-4"
	{form}
	schema={accountConfirmationSchema}
	let:config
	let:submitting
	action="?/submitCode"
>
	<Form.Field {config} name="code">
		<Form.Item>
			<Form.Label>Code</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="email">
		<Form.Item class="h-0 hidden">
			<Form.Input value={email} type="email" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	{#if isError && !submitting}
		<FormError message={error} />
	{/if}
	<Form.Button class="w-full h-12 text-base font-semibold rounded-full">
		{submitting ? 'Loading' : 'Submit Code'}
	</Form.Button>
</Form.Root>

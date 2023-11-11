<script lang="ts">
	import FormError from '$lib/components/error/form-error.svelte';
	import * as Form from '$lib/components/ui/form';
	import {
		authenticationSchema,
		type FormAuthenticationSchema
	} from '$lib/domain/schema/authentication.schema';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<FormAuthenticationSchema>;
	export let isError: boolean | undefined;
	export let error: string | undefined;
</script>

<Form.Root
	class="space-y-4"
	let:formValues
	let:submitting
	method="post"
	{form}
	schema={authenticationSchema}
	let:config
>
	<Form.Field {config} name="email">
		<Form.Item>
			<Form.Label>Email</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="password">
		<Form.Item>
			<Form.Label>Password</Form.Label>
			<Form.Input type="password" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	{#if isError && error && !submitting}
		<FormError message={error} />
	{/if}
	<Form.Button
		disabled={submitting || !formValues.email || !formValues.password}
		class="w-full h-12 text-base font-semibold rounded-full"
	>
		{submitting ? 'Loading' : 'Sign In'}
	</Form.Button>
</Form.Root>

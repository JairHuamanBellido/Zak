<script lang="ts">
	import FormError from '$lib/components/error/form-error.svelte';
	import * as Form from '$lib/components/ui/form';
	import { createUserSchema, type FormSchema } from '$lib/domain/schema/create-user.schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import PasswordPolicy from '../password-policy/password-policy.svelte';
	import { passwordIssues } from '$lib/utils/password-policy.validaator';
	export let form: SuperValidated<FormSchema>;
	export let isError: boolean | undefined;
	export let error: string;
</script>

<Form.Root
	class="space-y-4"
	let:formValues
	let:submitting
	method="post"
	{form}
	schema={createUserSchema}
	let:config
>
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Name</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="lastname">
		<Form.Item>
			<Form.Label>Lastname</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="gender">
		<Form.Item>
			<Form.Label>Gender</Form.Label>
			<Form.Select>
				<Form.SelectTrigger placeholder="Select a gender" />
				<Form.SelectContent>
					<Form.SelectItem value="male">Male</Form.SelectItem>
					<Form.SelectItem value="female">Female</Form.SelectItem>
					<Form.SelectItem value="other">Other</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

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
	{#if isError && !submitting}
		<FormError message={error} />
	{/if}

	<div class="space-y-1">
		<PasswordPolicy valid={!passwordIssues(formValues.password).includes('min')}>
			At least 8 characters
		</PasswordPolicy>
		<PasswordPolicy valid={!passwordIssues(formValues.password).includes('lowercase')}>
			At least 1 lowercase
		</PasswordPolicy>
		<PasswordPolicy valid={!passwordIssues(formValues.password).includes('uppercase')}>
			At least 1 uppercase
		</PasswordPolicy>
		<PasswordPolicy valid={!passwordIssues(formValues.password).includes('symbols')}>
			At least 1 symbol
		</PasswordPolicy>
		<PasswordPolicy valid={!passwordIssues(formValues.password).includes('digits')}>
			At least 1 digit
		</PasswordPolicy>
	</div>
	<Form.Button
		disabled={submitting ||
			!formValues.name ||
			!formValues.lastname ||
			!formValues.email ||
			!formValues.gender ||
			!formValues.password ||
			!!passwordIssues(formValues.password).length}>{submitting ? 'Loading' : 'Submit'}</Form.Button
	>
</Form.Root>

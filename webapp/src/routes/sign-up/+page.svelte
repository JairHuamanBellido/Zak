<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import SignUp from '$lib/components/register/form/sign-up.svelte';
	import FormError from '$lib/components/error/form-error.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<div>
	{#if form?.isSuccess}
		<p>Thanks for submitting</p>
	{:else}
		<div class="w-[600px] m-auto relative">
			<SignUp isError={form?.isError} error={form?.error || ''} form={data.form} />
		</div>
	{/if}
</div>

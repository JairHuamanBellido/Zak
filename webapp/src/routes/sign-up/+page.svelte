<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import SignUpForm from '$lib/components/register/form/sign-up.svelte';
	import RegisterBanner from '$lib/components/register/banner/register-banner.svelte';
	import {
		TypographyH1,
		TypographyLink,
		TypographyMuted,
		TypographyParagraph
	} from '$lib/components/ui/typography';
	import AccountConfirmationForm from '$lib/components/register/form/account-confirmation.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="flex h-full relative">
	<RegisterBanner />

	<div class="flex flex-col justify-center px-36">
		{#if form?.displayForm === 'SIGN_UP' || !form?.displayForm}
			<div class="space-y-1 mb-8">
				<TypographyH1 class="text-3xl lg:text-3xl">Sign up to Zak</TypographyH1>
				<TypographyParagraph class="text-foreground/50"
					>Join Zak today and take control of your financial future with intelligent investing.</TypographyParagraph
				>
			</div>
			<div class="w-[600px] relative">
				<SignUpForm isError={form?.isError} error={form?.error || ''} form={data.registerForm} />
			</div>
		{/if}

		{#if form?.displayForm !== 'SIGN_UP' && !!form?.displayForm}
			<div class="w-[600px]">
				<TypographyH1 class="mb-2">Thank You!</TypographyH1>
				<TypographyParagraph
					>Welcome to Zak! We're thrilled to have you on board. Thank you for choosing us as your
					investment partner.</TypographyParagraph
				>
				<div class="mt-8">
					{#if form?.displayForm === 'ACCOUNT_CONFIRMATION'}
						<TypographyMuted>
							Please enter the verification code that we've sent to your email. This code is
							necessary to complete your registration.
						</TypographyMuted>

						<AccountConfirmationForm
							isError={form.isError}
							error={form.error || ''}
							form={data.accountConfirmationForm}
							email={form.email ?? ''}
						/>
					{/if}
					{#if form?.displayForm === 'FINAL'}
						<TypographyParagraph
							>Account successfully verified!. Go to {' '}
							<TypographyLink class="font-semibold" href="/">Sign In</TypographyLink>
						</TypographyParagraph>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

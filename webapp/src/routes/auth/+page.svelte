<script lang="ts">
	import LoginBanner from '$lib/components/auth/banner/login-banner.svelte';
	import LoginForm from '$lib/components/auth/form/login-form.svelte';
	import { TypographyH1, TypographyLink, TypographyParagraph } from '$lib/components/ui/typography';

	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="flex w-full h-full relative">
	<div class="flex flex-col w-2/5 justify-between py-24 xl:px-24 px-12">
		<TypographyH1>Zak</TypographyH1>
		<div class="w-full max-w-[600px]">
			<div class="space-y-1 mb-8">
				<TypographyH1 class="lg:text-3xl">Sign In!</TypographyH1>
				<TypographyParagraph class="text-foreground/50"
					>Securely log in to Zak and unlock a world of personalized investment opportunities
					designed for your financial success.
				</TypographyParagraph>
			</div>
			<LoginForm error={form?.error} isError={form?.isError} form={data.form} />
		</div>
		<div>
			<TypographyParagraph>
				<span class="text-muted-foreground"> Don't have an account? </span>
				<TypographyLink href="/sign-up">Sign Up</TypographyLink>
			</TypographyParagraph>
		</div>
	</div>

	<LoginBanner />
</div>

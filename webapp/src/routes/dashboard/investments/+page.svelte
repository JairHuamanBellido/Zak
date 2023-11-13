<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { TypographyH1 } from '$lib/components/ui/typography';
	import Link from '$lib/components/ui/typography/link.svelte';
</script>

<header class="flex w-full items-center justify-between">
	<TypographyH1 class="lg:text-4xl">Investments</TypographyH1>
	<Button>
		<Link class="no-underline" href="/dashboard/investments/create">+ Create</Link>
	</Button>
</header>

<script lang="ts">
	import { TypographyLink } from '../ui/typography';

	export let href: string;
	export let label: string;
	export let icon: any;
</script>

<li>
	<TypographyLink
		class="transition-all flex font-light no-underline gap-x-2 w-full p-2 hover:bg-primary/5  rounded"
		{href}
	>
		<svelte:component this={icon} />
		{label}
	</TypographyLink>
</li>

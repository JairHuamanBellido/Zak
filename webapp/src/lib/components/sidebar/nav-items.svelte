<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { Link } from '../ui/typography';

	export let href: string;
	export let label: string;
	export let icon: any;
</script>

<li>
	<Link
		class="transition-all flex font-light no-underline gap-x-2 w-full p-2 hover:bg-primary/5  rounded"
		{href}
	>
		<svelte:component this={icon} />
		{label}
	</Link>
</li>

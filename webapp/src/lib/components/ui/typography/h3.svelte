<script lang="ts">
	import { cn } from '$lib/utils/utils';

	let classname: string | undefined = undefined;
	export { classname as class };
</script>

<h3 {...$$restProps} class={cn('scroll-m-20 text-2xl font-semibold tracking-tight', classname)}>
	<slot />
</h3>

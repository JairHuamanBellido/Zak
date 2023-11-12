<script lang="ts">
	import { cn } from '$lib/utils/utils';

	let classname: string | undefined = undefined;
	export { classname as class };
</script>

<h2
	{...$$restProps}
	class={cn(
		'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
		classname
	)}
>
	<slot />
</h2>

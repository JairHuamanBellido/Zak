<script lang="ts">
	import { cn } from '$lib/utils/utils';

	let classname: string | undefined = undefined;
	export { classname as class };
</script>

<h1
	{...$$restProps}
	class={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', classname)}
>
	<slot />
</h1>

<script lang="ts">
	import { cn } from '$lib/utils/utils';

	let classname: string | undefined = undefined;
	export { classname as class };
</script>

<small {...$$restProps} class={cn('text-sm font-medium leading-none', classname)}>
	<slot />
</small>

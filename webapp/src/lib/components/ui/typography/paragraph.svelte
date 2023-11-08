<script lang="ts">
	import { cn } from '$lib/utils/utils';

	let classname: string | undefined = undefined;
	export { classname as class };
</script>

<p {...$$restProps} class={cn('leading-7', classname)}>
	<slot />
</p>

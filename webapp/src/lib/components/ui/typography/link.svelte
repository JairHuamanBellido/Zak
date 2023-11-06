<script lang="ts">
	import { cn } from '$lib/utils/utils';

	let classname: string | undefined = undefined;
	let href: string;
	export { classname as class, href };
</script>

<a {href} {...$$restProps} class={cn('text-base text-inherit underline', classname)}>
	<slot />
</a>

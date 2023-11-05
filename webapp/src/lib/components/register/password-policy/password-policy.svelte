<script lang="ts">
	import { Paragraph } from '$lib/components/ui/typography';
	import { cn } from '$lib/utils/utils';

	export let valid: boolean;
</script>

<Paragraph
	class={cn({
		'text-foreground/50': !valid,
		'text-foreground': valid
	})}
>
	<slot />
</Paragraph>

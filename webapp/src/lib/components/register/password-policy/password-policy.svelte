<script lang="ts">
	import { Paragraph } from '$lib/components/ui/typography';
	import { cn } from '$lib/utils/utils';

	export let valid: boolean;
</script>

<Paragraph
	class={cn('p-1 rounded-sm text-sm', {
		'text-foreground/50 ': !valid,
		'text-green-700 bg-green-200': valid
	})}
>
	<slot />
</Paragraph>

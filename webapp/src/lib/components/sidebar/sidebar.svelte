<script>
	import { LayoutDashboard, Wallet2 } from 'lucide-svelte';
	import { TypographyH1 } from '../ui/typography';
	import NavItems from './nav-items.svelte';
</script>

<div class="border-r w-[240px] p-6 h-full">
	<TypographyH1 class="lg:text-3xl mb-12">Zak</TypographyH1>

	<ul class="space-y-3">
		<NavItems label={'Dashboard'} href="/dashboard" icon={LayoutDashboard} />
		<NavItems label={'Investments'} href="/dashboard/investments" icon={Wallet2} />
	</ul>
</div>

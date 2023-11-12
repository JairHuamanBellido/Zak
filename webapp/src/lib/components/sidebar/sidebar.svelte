<script>
	import { LayoutDashboard, Wallet2 } from 'lucide-svelte';
	import { HeadingH1 } from '../ui/typography';
	import NavItems from './nav-items.svelte';
</script>

<div class="border-r w-[300px] p-6 h-full">
	<HeadingH1 class="lg:text-3xl mb-12">Zak</HeadingH1>

	<ul class="space-y-3">
		<NavItems label={'Dashboard'} href="/dashboard" icon={LayoutDashboard} />
		<NavItems label={'Investments'} href="/dashboard" icon={Wallet2} />
	</ul>
</div>

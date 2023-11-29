<script lang="ts">
	import Sidebar from '$lib/components/sidebar/sidebar.svelte';
	import { jwtTokenStore } from '$lib/store/jwt-token.store';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	jwtTokenStore.set(data.jwtCookie);
</script>

<div class="w-screen h-screen relative flex overflow-none">
	<Sidebar />
	<div class="w-[calc(100%_-_240px)] p-12 overflow-auto">
		<slot />
	</div>
</div>

<script>
	import Sidebar from '$lib/components/sidebar/sidebar.svelte';
</script>

<div class="w-screen h-screen relative flex overflow-auto">
	<Sidebar />
	<div class="w-[calc(100%_-_300px)] p-12">
		<slot />
	</div>
</div>

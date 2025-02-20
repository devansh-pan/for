<script lang="ts">
	import "../app.css";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	let { children, data } = $props();
	const { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>
<div class="flex flex-col min-h-dvh">
<header class="p-4 border-b ">
	<p class="text-3xl font-bold">Svelty</p>
</header>
<main class="grow p-2">
{@render children()}
</main>
<footer class="p-4 border-t">
	<small>Svelty &copy; 2025</small>
</footer>
</div>
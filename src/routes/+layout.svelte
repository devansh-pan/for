<script lang="ts">
	import "../app.css";
	import { invalidate ,goto} from "$app/navigation";
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
	<header class="p-4 border-b">
		<a href="/"><p class="text-3xl font-bold">Svelty</p></a>
	</header>
	<main class="grow p-2">
		{@render children()}
	</main>
	<footer class="p-4 *:text-sm *:text-gray-800 border-t">
		<small class="text-gray-700">Svelty &copy; {new Date().getFullYear()}</small>
		<br />
		<a href="/auth">Login</a><br>
		<button type="button" class="btn text-sm preset-filled" onclick={() => goto("/app")}>
     Dashboard
		</button>
	</footer>
</div>

<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  const { data } = $props();

  onMount(() => {
    console.log(data);
  });
</script>

<div class="flex gap-4">
  <form method="POST" action="?/github">
    <button type="submit" class="btn preset-filled">GitHub OAuth</button>
  </form>
  <form method="POST" action="?/logout">
    <button type="submit" class="btn preset-filled">Sign Out</button>
  </form>
  <button type="button" class="btn preset-filled" onclick={() => goto("/app")}>
    Go to App
  </button>
</div>
<h2 class="text-2xl font-bold">Session</h2>
<pre>{JSON.stringify(data.session, null, 2)}</pre>
<h2 class="text-2xl font-bold">User</h2>
<pre>{JSON.stringify(data.user, null, 2)}</pre>

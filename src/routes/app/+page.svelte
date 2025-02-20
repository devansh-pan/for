<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  const { data } = $props();
  const { supabase } = data;
  let events: any[] = $state([]);

  async function fetchEvents() {
    const { data } = await supabase.from("events").select("*").limit(5);
    events = data ?? [];
  }
</script>

<div class="grid grid-cols-2 gap-4">
  <div>
    <h1 class="text-2xl font-bold">Data from Server</h1>
    <pre class="overflow-auto max-h-96">{JSON.stringify(
        data.events,
        null,
        2
      )}</pre>
  </div>
  <div>
    <h1 class="text-2xl font-bold">Data from Client</h1>
    <button type="button" class="btn preset-tonal-primary" onclick={fetchEvents}
      >Fetch Events</button
    >
    <pre class="overflow-auto max-h-96">{JSON.stringify(events, null, 2)}</pre>
  </div>
</div>

<button
  type="button"
  class="btn preset-filled-primary-500"
  onclick={() => goto("/")}
>
  Go Home
</button>

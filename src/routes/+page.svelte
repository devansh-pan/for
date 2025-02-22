<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  const { data } = $props();
  const { posts } = $derived(data);
  onMount(() => {
    //console.log(data);
  });
</script>

{#if posts.length > 0}
  <h1 class="text-xl">Archieve</h1>
  <div class="flex flex-col md:flex-col-3 lg:flex-col-4 my-2">
    {#each posts as post}
      <div class="border p-4 ">
       <a href="/posts/{post?.slug}"> <h2 class="text-xl font-bold">{post?.title ?? "Svelty"}</h2></a>
        <small class="italic">{post.author}</small>&nbsp;
        <small>{new Intl.DateTimeFormat(navigator.language,{'month':'long','year':'numeric','day':'numeric'}).format(new Date(post.posted_at))}</small><br>
        <p class="mt-2">{post?.description}</p>
      </div>
    {/each}
  </div>
{/if}
<div class="flex gap-4">
  
</div>


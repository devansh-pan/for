<script>
  let {data} = $props();
  let {post} = $derived(data)
  console.log(post);
</script>
<h1 class="text-3xl font-bold">{post[0]?.title}</h1>
<small>{post[0].author + "  "+  new Date(post[0].posted_at)}</small>
<div class="prose mt-4">
{@html data?.content}
</div>
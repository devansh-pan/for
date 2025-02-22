<script>
  let {data} = $props();
  let {post} = $derived(data)
  console.log(post);
  let date = new Date(post[0].posted_at);
</script>
<h1 class="text-3xl font-bold">{post[0]?.title}</h1>
<small class="italic">{post[0].author} &nbsp; &nbsp;  updated:  {new Intl.DateTimeFormat(navigator.language,{'month':"long",'year':'numeric','day':'numeric'}).format(date)}</small>
<div class="prose mt-4">
{@html data?.content}
</div>
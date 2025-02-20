<script>
  import {goto} from '$app/navigation'
</script>
<div class="flex gap-4">
  <form method="POST" action="/?/github">
    <button type="submit" class="btn preset-filled">GitHub OAuth</button>
  </form>
  <form method="POST" action="/?/logout">
    <button type="submit" class="btn preset-filled">Sign Out</button>
  </form>
  <button type="button" class="btn preset-filled" onclick={() => goto("/app")}>
    Go to App
  </button>
</div>
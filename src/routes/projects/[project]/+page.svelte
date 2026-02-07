<script>
  // Loading Markdown
  import MarkdownIt from "markdown-it";
  let { data } = $props();
  let { markdown } = data;
  const md = new MarkdownIt();

</script>

<div class="px-4 py-1">
  {@html md.render(markdown)}
</div>

<style>
  :global(h1) {
    font-weight: bold;
    font-size: 50px;
  }
</style>

<script>
  // Loading Markdown
  import MarkdownIt from "markdown-it";
  let { data } = $props();
  let { markdown } = data;
  const md = new MarkdownIt({
    html: true
  });

</script>

<div class="px-4 py-1 project-markdown">
  {@html md.render(markdown)}
</div>

<style>
  .project-markdown :global(h1) {
    font-weight: bold;
    font-size: 50px;
  }

  .project-markdown :global(h2) {
    font-weight: bold;
    font-size: 32px;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  .project-markdown :global(p) {
    margin-block: 1rem;
    line-height: 1.7;
  }

  .project-markdown :global(ul) {
    list-style: disc;
    padding-left: 1.5rem;
    margin-block: 1rem;
  }

  .project-markdown :global(ol) {
    list-style: decimal;
    padding-left: 1.5rem;
    margin-block: 1rem;
  }

  .project-markdown :global(li) {
    margin-block: 0.4rem;
  }

  .project-markdown :global(strong) {
    font-weight: 700;
  }

  .project-markdown :global(blockquote) {
    border-left: 4px solid #059033;
    padding-left: 1rem;
    margin-block: 1.5rem;
    font-style: italic;
  }
</style>

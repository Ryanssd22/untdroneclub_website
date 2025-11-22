<!-- PAGE HEADER -->
<!-- Put this on any new page as its main title/header -->
<script>
  import { fly } from 'svelte/transition';
  let { src, alt, title } = $props();
</script>

<div class="w-full h-38 relative flex flex-center items-center overflow-hidden">
  <img {alt} {src} class="scale-110 blur-xs object-cover w-full h-full absolute inset-0" />
  <h1 in:fly={{y:-5}} class="font-[Bronzier] tracking-wide m-auto relative font-bold text-white text-6xl">{title}</h1>
</div>



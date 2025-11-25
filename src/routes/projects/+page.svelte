<!-- PROJECTS -->
<script>
  // Svelte imports
  import { onMount } from 'svelte';

  // Animation imports
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { fly } from 'svelte/transition';

  // Projects Imports 
  import projects from '$lib/projects/projects.json';
  import ProjectPreview from '$lib/projects/ProjectPreview.svelte';

  // Background Import
  import GridPattern from '$lib/components/GridPattern.svelte';

  // Background Animation
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(".gridPattern", {
      scrollTrigger: {
        trigger: ".projectGrid",
        start: 'top top',
        scrub: 1,
      },
      y: -100,
    })
  })

  // Importing previews 
  const previews = import.meta.glob('$lib/projects/previews/*.svelte');
  let loadedPreviews = {}; // Filled with preview promises
  onMount(async () => {
    for (const preview in previews) {
      const trimmedPreviewPath = preview.replace('/src/lib/projects/previews/', '');
      loadedPreviews[trimmedPreviewPath] = previews[preview];
      // loadedPreviews = previews[preview]();
    } 
    console.log(loadedPreviews);
  })
</script>

<div class="projectGrid w-full bg-white px-4">
  <!-- TITLE -->
  <div class="z-10 relative flex justify-center mt-4">
    <h1 class="font-bold text-7xl font-[Bronzier] tracking-[4px]">Our Projects</h1>
  </div>
  
  <!-- PROJECT GRID -->
  <div class="w-full flex justify-center my-4">
    <div in:fly={{ y: 5 }} class="grid grid-cols-1 projsm:grid-cols-2 projmd:grid-cols-3 gap-4">
      {#each projects as project (project.preview)}
        <!-- Await import of preview -->
        {#if project.previewType == "3D"}
          {#await import(`/src/lib/projects/previews/${project.preview}`) }
            <ProjectPreview type="preview" />
          {:then { default: Preview }}
            <ProjectPreview href={project.href} title={project.title} subtitle={project.subtitle} description={project.description} {Preview} type="3D" />
          {/await}
        {:else if project.previewType == "IMG"}
          <ProjectPreview href={project.href} title={project.title} subtitle={project.subtitle} description={project.description} />
        {/if}
      {/each}
    </div>
  </div>

  <!-- GRID BG -->
  <div class="opacity-80 gridPattern z-0 w-full fixed inset-0 scale-110">
    <GridPattern class="[mask-image:radial-gradient(900px_circle_at_center,transparent,white)]" fillColor="#059033" width={70} height={70}/>
  </div>

</div>

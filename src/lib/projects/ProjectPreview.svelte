<!-- A button that leads to a project's webpage, featuring a 3d model of said project -->
<!-- ... Or an image -->
<script>
  // Threlte imports
  import { Canvas } from '@threlte/core';

  // Svelte imports
  import { Tween } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  let { type = undefined, title, subtitle, description, Preview = undefined, href = "/" } = $props();

  //Hover animation handling
  let model = undefined;
  let hovering = $state(false);
  let yPos = new Tween(0, {duration: 500, easing: cubicInOut});
  function mouseEnter() {
    hovering = true;
    yPos.target = -50;
  }
  function mouseLeave() {
    hovering = false;
    yPos.target = 0;
  }
</script>

<!-- PROJECTPREVIEW DIV -->
<a {href} 
  onmouseenter={mouseEnter} onmouseleave={mouseLeave} 
  class="z-10 bg-linear-to-t from-10% to-60% from-[#ace6bf] to-white cursor-pointer hover:scale-102 transition-all rounded-sm projectDiv relative overflow-hidden w-[406px] h-[410px] stroke-black hover:stroke-unt-green stroke-2 hover:stroke-7"
  style="clip-path: url(#projectShape);">
  <!-- PREVIEW -->
  {#if type == "preview"}
    <div class="bg-gray-200 w-full h-full"></div> 
  {:else} <!-- NOT PREVIEW -->
    <!-- DESCRIPTION -->
    <div class="flex z-10 flex-col mx-2 my-1">
      <h3 class="font-bold text-6xl">{title}</h3>
      <p class="italic">{subtitle}</p>
      <p>{description}</p>
    </div>

    <!-- MODEL -->
    {#if type == "3D"}
      <div class="z-0 absolute inset-0 translate-y-25" style="transform: translateY({yPos.current}px);">
        <Canvas>
            <Preview />
        </Canvas>
      </div>
    {/if}
  {/if}

  <!-- CUSTOM DIV SHAPE -->
  <svg class="absolute inset-0 w-full h-full pointer-events-none">
    <defs>
      <clipPath id="projectShape" clipPathUnits="userSpaceOnUse">
        <path d="M8 .5h390.89a7.5 7.5 0 0 1 7.5 7.5v356.983a7.5 7.5 0 0 1-7.5 7.5H263.329a23.502 23.502 0 0 0-18.375 8.849l-16.499 20.695a22.502 22.502 0 0 1-17.593 8.473H8A7.5 7.5 0 0 1 .5 403V8A7.5 7.5 0 0 1 8 .5Z"/>
      </clipPath>
    </defs>
    <path 
      d="M8 .5h390.89a7.5 7.5 0 0 1 7.5 7.5v356.983a7.5 7.5 0 0 1-7.5 7.5H263.329a23.502 23.502 0 0 0-18.375 8.849l-16.499 20.695a22.502 22.502 0 0 1-17.593 8.473H8A7.5 7.5 0 0 1 .5 403V8A7.5 7.5 0 0 1 8 .5Z"
      class="fill-none"
      vector-effect="non-scaling-stroke"></path>
  </svg>

  <!-- <svg class="absolute inset-0 w-full stroke-2 stroke-unt-green h-full fill-none hover:scale-102 transition-all" viewBox="0 0 407 411"> -->
  <!--   <path  -->
  <!--     d="M8 .5h390.89a7.5 7.5 0 0 1 7.5 7.5v356.983a7.5 7.5 0 0 1-7.5 7.5H263.329a23.502 23.502 0 0 0-18.375 8.849l-16.499 20.695a22.502 22.502 0 0 1-17.593 8.473H8A7.5 7.5 0 0 1 .5 403V8A7.5 7.5 0 0 1 8 .5Z" -->
  <!--     vector-effect="non-scaling-stroke"></path> -->
  <!-- </svg> -->
</a>

<style>
</style>

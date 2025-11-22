<!-- A button that leads to a project's webpage, featuring a 3d model of said project -->
<!-- ... Or an image -->
<script>
  // Threlte imports
  import { Canvas } from '@threlte/core';
  import Crazyflie from '$lib/assets/3d/Crazyflie.svelte';
  import Stingray from '$lib/assets/3d/Stingray.svelte';
	import { T } from '@threlte/core';
  import { Tween } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  let { type = undefined, title, subtitle, description, Model } = $props();

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

<!-- CRAZYFLIE -->
<div role="navigation" onmouseenter={mouseEnter} onmouseleave={mouseLeave} class="hover:scale-102 transition-all aspect-square rounded-sm projectDiv relative border border-black overflow-hidden">
  <!-- DESCRIPTION -->
  <div class="flex flex-col mx-2 my-1">
    <h3 class="font-bold text-6xl">{title}</h3>
    <p>{subtitle}</p>
    <p>{description}</p>
  </div>

  <!-- MODEL -->
  <div class="absolute inset-0 translate-y-25" style="transform: translateY({yPos.current}px);">
    <Canvas>
        <Model />
    </Canvas>
  </div>
</div>

<style>
</style>

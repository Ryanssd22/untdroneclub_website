<!-- Hero animation that should run on startup of the website -->
<script>
  //Threlte Imports
  import { T } from '@threlte/core'
  import { Canvas } from '@threlte/core';
  import { EquirectangularReflectionMapping, TextureLoader, Vector3 } from 'three';
  import { OrbitControls, Environment, Grid } from '@threlte/extras';
  import Dji from '$lib/assets/3d/Dji.svelte';
  import { HDRLoader } from 'three/examples/jsm/Addons.js';

  //Svelte imports
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { backInOut } from 'svelte/easing';
  import { navBarSettings } from '$lib/components/navbarSettings.svelte.js'

  //HDRI Loader an environment
  let loader = null, promise = $state(null);
  onMount(() => {
    loader = new HDRLoader();
    promise = loader.loadAsync('3d/lilienstein_4k.hdr').then((texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      return texture;
    });
  })
  // let skybox = $state();
  // const ground = { height: 15, radius: 100};
  // $effect(() => {
  //   skybox?.position.setY(ground.height);
  // })

  //Animation
  let djiY = new Tween(4.3, {easing: backInOut , duration: 1000});
  function animate() {
    djiY.target = 88;
  }

</script>

<div class="relative bg-white w-screen h-screen">
  <!-- TITLE -->
  <div class="relative z-20 flex flex-col justify-center h-full">
    <h1 class="font-bold text-8xl">UNT DRONE CLUB</h1>
    <button onclick={animate} class="p-2 w-40 rounded-xl bg-gray-400 hover:bg-blue-400">Animate</button>
  </div>

  <!-- 3D MODEL  -->
  <div class="z-10 absolute inset-0 w-screen h-screen">
    <Canvas>
      <!-- Drone model -->
      {#if navBarSettings.ready}
        <Dji position={[0, djiY.current, 0]} />

      {/if}

      <!-- Ground Plane -->
      <Grid infiniteGrid cellSize={5} sectionColor="#000000" fadeOrigin={[0,0,0]} fadeDistance={30} />

      <!-- Environment texture -->
      <!-- <Environment url="src/lib/assets/3d/lilienstein_4k.hdr" bind:skybox {ground} /> -->
      {#await promise then texture}
        <Environment isBackground {texture} />
      {/await}

      <!-- CAMERA -->
      <T.PerspectiveCamera makeDefault position={[45,10,90]} fov={18}>
        <OrbitControls target={[0,djiY.current,0]} autoRotate autoRotateSpeed={0.5}/>
      </T.PerspectiveCamera>

    </Canvas>
  </div>
</div>

<!-- Hero animation that should run on startup of the website -->
<script>
  //Threlte Imports
  import { T } from '@threlte/core'
  import { Canvas } from '@threlte/core';
  import { EquirectangularReflectionMapping, TextureLoader, Vector3 } from 'three';
  import { OrbitControls, Environment, Grid } from '@threlte/extras';
  import Dji from '$lib/assets/3d/Dji.svelte';
  import DjiLess from '$lib/assets/3d/DjiLess.svelte';
  import { HDRLoader } from 'three/examples/jsm/Addons.js';

  //Svelte imports
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { backInOut } from 'svelte/easing';
  import { navBarSettings } from '$lib/components/navbarSettings.svelte.js'
  import HeroImage from './HeroImage.svelte';

  //Image imports

  //HDRI Loader an environment
  let loader = null, promise = $state(null);
  $effect(() => {
    if (navBarSettings.ready) {
      loader = new HDRLoader();
      promise = loader.loadAsync('3d/tiergarten_4k.hdr').then((texture) => {
        texture.mapping = EquirectangularReflectionMapping;
        return texture;
      });
    }
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
  let screenWidth = $state(0);
  let screenHeight = $state(0);
  let screenRatio = $derived(screenWidth/screenHeight);
  let djiX = $derived(screenRatio * 9);
  let djiScale = $derived(screenRatio * 0.45 );

  $inspect("RATIO:", screenRatio);

  // DEMOING:
  let DEMO = $state(2);

</script>

<!-- SCREEN WIDTH & HEIGHT-->
<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<div class="absolute bg-white w-screen h-screen">
  {#if DEMO == 1}
  <!-- HERO IMAGE -->
  <!-- <div class="absolute inset-0 z-10"> -->
  <!--   <HeroImage /> -->
  <!-- </div> -->

  <!-- TITLE -->
  <div class="md:w-1/2 relative z-20 flex h-full ml-5 md:ml-15">
    <div class="flex flex-col justify-end">
      <div class="flex flex-col justify-end md:justify-start h-2/3">
        <!-- <div class="flex gap-2 md:gap-0 md:flex-col italic tracking-[4px] font-bold font-[Bronzier] text-6xl md:text-9xl"> -->
        <!--   <h1>UNT</h1> -->
        <!--   <h1>Drone</h1> -->
        <!--   <h1>Club</h1> -->
        <!-- </div> -->
        <h1 class="font-bold text-8xl font-[Bronzier] tracking-[4px]">UNT Drone Club</h1>
        <p>A place to fly, design, build, and research drones</p>
        <button onclick={animate} class="p-2 w-40 rounded-xl bg-gray-400 hover:bg-blue-400">Animate</button>
      </div>
    </div>
  </div>

  <!-- 3D MODEL  -->
  <div class="z-10 absolute inset-0 w-screen h-screen">
    <Canvas>
      {#if navBarSettings.ready}
        <!-- Drone model -->
        <!-- <Dji position={[0, djiY.current, 0]} /> -->
        <DjiLess scale={djiScale} position={[djiX, djiY.current, 0]}/>

        <!-- Ground Plane -->
        <Grid infiniteGrid cellSize={5} sectionColor="#000000" fadeOrigin={[djiX,0,0]} fadeDistance={djiScale*30} />
      {/if}


      <!-- Environment texture -->
      <!-- <Environment url="src/lib/assets/3d/lilienstein_4k.hdr" bind:skybox {ground} /> -->
      {#await promise then texture}
        <Environment {texture} />
      {/await}
      <T.AmbientLight intensity={0.5} />

      <!-- CAMERA -->
      <T.PerspectiveCamera makeDefault position={[45,10,90]} fov={18}>
        <OrbitControls target={[0,djiY.current,0]} autoRotate autoRotateSpeed={0} enablePan={false} enableZoom={false} enableRotate={true}/>
      </T.PerspectiveCamera>

    </Canvas>
  </div>

  {:else if DEMO == 2}
  <!-- TITLE -->
  <div class="relative w-1/2 h-full -bottom-20 py-4 mx-4">
    <h1 class="font-[Bronzier] font-bold text-8xl tracking-[4px]">UNT Drone Club</h1>
    <p class="italic px-1">University of North Texas | College of Engineering </p>
  </div>

  <!-- 3D MODEL  -->
  <div class="z-10 absolute inset-0 w-screen h-screen">
    <Canvas>
      {#if navBarSettings.ready}
        <!-- Drone model -->
        <!-- <Dji position={[0, djiY.current, 0]} /> -->
        <DjiLess scale={djiScale * 0.9} position={[0, djiY.current, 0]}/>

        <!-- Ground Plane -->
        <Grid infiniteGrid cellSize={5} sectionColor="#000000" fadeOrigin={[0,0,0]} fadeDistance={djiScale*30} />
      {/if}


      <!-- Environment texture -->
      <!-- <Environment url="src/lib/assets/3d/lilienstein_4k.hdr" bind:skybox {ground} /> -->
      {#await promise then texture}
        <Environment {texture} />
      {/await}
      <T.AmbientLight intensity={0.5} />

      <!-- CAMERA -->
      <T.PerspectiveCamera makeDefault position={[85,5,0]} fov={18}>
        <OrbitControls target={[0,djiY.current,0]} autoRotate autoRotateSpeed={0} enablePan={false} enableZoom={false} enableRotate={true}/>
      </T.PerspectiveCamera>

    </Canvas>
  </div>
  {/if}
</div>


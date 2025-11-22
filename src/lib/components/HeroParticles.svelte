<!-- Cool particles from tsparticles -->
<script>
  //Imports
  import Particles, { particlesInit } from '@tsparticles/svelte';
	//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
	import { loadSlim } from '@tsparticles/slim';

  let particlesConfig = {
		particles: {
			color: {
				value: '#7af57e'
			},
			links: {
				enable: true,
				color: '#7af57e'
			},
			move: {
				enable: true,
        speed: 0.5 
			},
			number: {
				value: 50 
			}
		}
	};

  let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;

		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	void particlesInit(async (engine) => {
		// call this once per app
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadSlim(engine);
	});
</script>

<Particles
	id="tsparticles"
  class="opacity-50"
	style=""
	options="{particlesConfig}"
	on:particlesLoaded="{onParticlesLoaded}"
/>



<!-- LANDING PAGE -->

<script>
  //About us
  import CheckerboardPattern from '$lib/components/CheckerboardPattern.svelte';
  //What we do

  //Components
  // import DotPattern from '$lib/components/DotPattern.svelte';
	import HeroImage from '$lib/components/HeroImage.svelte';
	import CrewCarousel from '$lib/components/CrewCarousel.svelte';
  import F1Stripe from '$lib/components/F1Stripe.svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { SplitText } from 'gsap/SplitText';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import ProjectPreview from '$lib/components/ProjectPreview.svelte';
  import HeroAnimation from '$lib/components/HeroAnimation.svelte';
  let { data } = $props();
  let { navbarReady } = data;

  // 3d Models
  import Crazyflie from '$lib/assets/3d/Crazyflie.svelte';
  import Stingray from '$lib/assets/3d/Stingray.svelte';

  //Icons

  //Ready on mount
  let ready = $state(false);
  onMount(() => {
    if (navbarReady) {
      ready = true;
    }
  });

	//Hero text
	const hero_text_choices = ['Engineers', 'Innovators', 'Businessmen', 'Developers'];
	const HERO_INTERVAL = 3500;
	let hero_index = $state(0);
	let hero_text = $derived(hero_text_choices[hero_index]);
	const hero_text_interval = setInterval(() => {
		const previous_index = hero_index;
		while (previous_index == hero_index) {
			hero_index = Math.floor(Math.random() * hero_text_choices.length);
		}
	}, HERO_INTERVAL);

  //Hero component animation
  onMount(() => {
    // gsap.registerPlugin(SplitText);
    // gsap.registerPlugin(ScrollTrigger);
    //
    // let heroGsap = gsap.timeline();
    // let heroTitle = SplitText.create(".heroTitle", {type: "words"});
    // let heroPreTitle = SplitText.create(".heroPreTitle", {type: "chars"})
    // heroGsap.add('start')
    //   .to(".heroBlack", {opacity: 0, duration: 1, delay: 0.2}, 'start')
    //   .to(".heroImage", {scale: 1, duration: 2, ease: 'power2.inOut'}, 'start')
    //   .fromTo(heroPreTitle.chars, {y: -50, opacity: 0}, {y: 0, opacity: 1, stagger: 0.01, delay: 0.2}, 'start')
    //   .fromTo(heroTitle.words, {y: 50, opacity: 0}, {y:0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.4, stagger: 0.05}, 'start')
    //
    // let heroExit = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.mainHome',
    //     start: 'top bottom',
    //     end: 'top top',
    //     scrub: 1,
    //   }
    // });
    //
    // heroExit.addLabel('exit')
    //   .to(".heroImage", {y:10, scale: 1.06}, 'exit')
    //   .to(".heroBody", {y:40}, 'exit')
    //   .fromTo(".heroBlackExit", {opacity: 0}, {opacity: 0.8}, 'exit')


  })
  
</script>

<!-- 3D HERO COMPONENT -->
<div class="fixed z-10 h-screen w-screen overflow-hidden">
  <HeroAnimation />
</div>

<!-- HERO COMPONENT -->
<!-- <div class="fixed z-10 h-screen w-full overflow-hidden"> -->
	<!-- HERO IMAGE -->
<!-- 	<div class="heroImage absolute inset-0 scale-106"> -->
<!-- 		<HeroImage /> -->
<!-- 	</div> -->
<!---->
  <!-- BLACK SCREEN -->
<!--   <div class="z-50 heroBlack absolute inset-0 w-screen h-screen bg-black"></div> -->
<!--   <div class="z-50 heroBlackExit absolute inset-0 w-screen h-screen bg-black"></div> -->
<!---->
	<!-- BODY CONTENT -->
<!-- 	<div class="heroBody absolute inset-0 z-20 flex h-full w-full flex-row justify-center px-10 text-white"> -->
<!---->
<!--     <div class="flex flex-col items-center justify-center w-full h-full"> -->
<!--       {#if ready} -->
<!--         <h3 class="heroPreTitle font-bold text-center text-white text-sm sm:text-xl italic mb-2 text-shadow-lg">University of North Texas • Engineering</h3> -->
<!--         <div class="flex items-center flex-between gap-20"> -->
          <!-- <F1Stripe customClass="leftStripe"/> -->
<!---->
          <!-- TITLE -->
<!--           <div class="block overflow-hidden sm:mb-5 mb-0"> -->
<!--             <h1 class="heroTitle font-[Bronzier] tracking-wider font-bold white text-6xl sm:text-9xl text-center text-shadow-lg sm:-mb-5 mb-0"> -->
<!--               UNT <span class="text-green-200">Drone</span> Club  -->
<!--             </h1> -->
<!--           </div> -->
<!---->
          <!-- <F1Stripe /> -->
<!--         </div> -->
<!--         <p class="text-lg text-blue-200">Look up at us</p> -->
<!---->
<!--         <a href="/members" class="mt-8 overflow-hidden relative group bg-green-700 w-32 h-10 transform -skew-x-12 items-center flex justify-center"> -->
<!--           <div class="bg-green-600 absolute w-full h-full -translate-x-full transition-all group-hover:translate-x-0"></div> -->
<!--           <p class="relative">Contact Us</p> -->
<!--         </a> -->
<!---->
<!--       {/if} -->
<!--     </div> -->
<!-- 	</div> -->
<!-- </div> -->

<!-- SPACING -->
<div class="h-screen"></div>

<!-- MAIN HOME CONTENT -->
<div class="mainHome relative z-20 bg-green-50 w-screen">
  <!-- PROJECTS -->
  <div class="flex flex-col justify-center">
    <!-- TITLE -->
    <div class="flex justify-center">
      <h2>Our Projects</h2>
    </div>
    
    <!-- PROJECTS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:mx-10">
      <!-- <ProjectPreview Model={Crazyflie} type="3d" title="Crazyflie" subtitle="Bitcraze" description="A palm-sized research quadcopter with a powerful, modular feature set"/> -->
      <!-- <ProjectPreview Model={Stingray} type="3d" title="Stingray" subtitle="idk lol" description="Matthew's finest work"/> -->
      <!-- <ProjectPreview title="World Record Drone" subtitle="Maybe" description="This guy goes faster than the speed limit"/> -->
      <ProjectPreview type="placeholder"/>
    </div>
  </div>

  <!-- CREW CAROUSEL -->
  <!-- <div class="items-center flex flex-col justify-center"> -->
  <!--   <h2>Our crew</h2> -->
  <!--   <p>Couldn't have done it without you</p> -->
  <!--   <CrewCarousel /> -->
  <!-- </div> -->
</div>

<style>
	h2 {
		font-family: Bronzier;
		letter-spacing: 0.03em;
    font-size: 5em;
	}
</style>

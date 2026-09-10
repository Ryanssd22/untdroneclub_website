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
  import ProjectPreview from '$lib/projects/ProjectPreview.svelte';
  import HeroAnimation from '$lib/components/hero/HeroAnimation.svelte';
  let { data } = $props();
  let { navbarReady } = data;

  // 3d Models
  import Crazyflie from '$lib/projects/previews/Crazyflie.svelte';
  import Stingray from '$lib/projects/previews/Stingray.svelte';

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
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollTrigger);

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
<div class="z-10 h-screen w-full overflow-hidden">
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
<!-- <div class="h-screen"></div> -->

<!-- MAIN HOME CONTENT -->
<div class="mainHome relative z-[50] w-full -top-10">

  <!-- PROJECTS -->
  <section class=" projects-folder">

    <div class="projects-folder-inner">

      <!-- FOLDER TAB TITLE -->
      <div class="projects-folder-title">
        <h2 class="projects-title">Our Projects</h2>
      </div>

      <!-- PROJECT GRID -->
      <div
        class="
          grid
          grid-cols-1
          gap-4
          px-4
          pb-16
          pt-10
          sm:mx-10
          projsm:grid-cols-2
          projmd:grid-cols-3
        "
      >
        <ProjectPreview
          href="/projects/crazyflie"
          Preview={Crazyflie}
          type="3D"
          title="Crazyflie"
          subtitle="Bitcraze"
          description="A palm-sized research quadcopter with a powerful, modular feature set"
        />

        <ProjectPreview
          href="/projects/stingray"
          Preview={Stingray}
          type="3D"
          title="Stingray"
          subtitle="idk lol"
          description="Matthew's finest work"
        />

        <ProjectPreview
          href="/projects/racing"
          type="IMG"
          src="/project_photos/racing.jpg"
          title="Drone Racing"
          subtitle="MultiGP"
          description="Racing at Mach 10"
        />

        <ProjectPreview
          href="/projects/saeaero"
          type="IMG"
          src="/project_photos/saeaero.jpg" 
          title="SAE AERO Competition"
          subtitle="Autonomous Flight"
          description="Attempting to create our first ever custom VTOL"
        />
      </div>

    </div>

  </section>


  <!-- CREW CAROUSEL -->
  <div class="flex flex-col items-center justify-center">
    <h2>Our crew</h2>
    <p>Couldn't have done it without you</p>

    <CrewCarousel />
  </div>

</div>

<style>
  h2 {
    font-family: Bronzier;
    letter-spacing: 0.03em;
    font-size: 5em;
  }


  /* ============================================================
     PROJECTS FOLDER
     ============================================================ */

  .projects-folder {
  --tab-height: clamp(80px, 9vw, 120px);

  position: relative;
  z-index: 20;

  margin-top: calc(var(--tab-height) * -0.65);

  clip-path: polygon(
    0 var(--tab-height),
    25% var(--tab-height),
    31% 0,
    69% 0,
    75% var(--tab-height),
    100% var(--tab-height),
    100% 100%,
    0 100%
  );

  filter: drop-shadow(0 -8px 18px rgb(0 0 0 / 0.08));
}


  /* ============================================================
     INNER FOLDER
     ============================================================ */

  .projects-folder-inner {
    --tab-height: clamp(80px, 9vw, 120px);

    position: relative;

    background: #f0fdf4;

    clip-path: polygon(
      0 var(--tab-height),

      25% var(--tab-height),
      31% 0,

      69% 0,
      75% var(--tab-height),

      100% var(--tab-height),

      100% 100%,
      0 100%
    );
  }


  /* ============================================================
     TAB TITLE
     ============================================================ */

  .projects-folder-title {
    height: var(--tab-height);

    display: flex;
    align-items: center;
    justify-content: center;

    padding-top: 0.35rem;
  }


  .projects-title {
    margin: 0;

    font-size: clamp(2.5rem, 5.5vw, 5rem);
    line-height: 0.9;

    color: #064e3b;

    text-align: center;
    text-transform: uppercase;
  }


  /* ============================================================
     MOBILE
     ============================================================ */

  @media (max-width: 640px) {
    .projects-folder {
      --tab-height: 78px;

      /*
        Slightly wider tab on small displays.
      */
      clip-path: polygon(
        0 var(--tab-height),

        12% var(--tab-height),
        20% 0,

        80% 0,
        88% var(--tab-height),

        100% var(--tab-height),

        100% 100%,
        0 100%
      );
    }

    .projects-folder-inner {
      --tab-height: 78px;

      clip-path: polygon(
        0 var(--tab-height),

        12% var(--tab-height),
        20% 0,

        80% 0,
        88% var(--tab-height),

        100% var(--tab-height),

        100% 100%,
        0 100%
      );
    }

    .projects-title {
      font-size: 2.6rem;
    }
  }
</style>

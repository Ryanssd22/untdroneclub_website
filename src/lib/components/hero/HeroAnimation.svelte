<script>
  // ============================================================
  // THRELTE / THREE
  // ============================================================
  import { T, Canvas } from '@threlte/core';
  import { Environment } from '@threlte/extras';

  import {
    EquirectangularReflectionMapping
  } from 'three';

  import { HDRLoader } from 'three/examples/jsm/Addons.js';

  import SaeAero from '$lib/assets/3d/sae_aero.svelte';

  // ============================================================
  // SVELTE
  // ============================================================
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { quintOut } from 'svelte/easing';

  import { navBarSettings } from '$lib/components/navbarSettings.svelte.js';
  import { heroSettings } from './heroSettings.svelte.js';

  // ============================================================
  // ICONS
  // ============================================================
  import TablerPropeller from '~icons/tabler/propeller';

  // ============================================================
  // GSAP
  // ============================================================
  import { gsap } from 'gsap';
  import { SplitText } from 'gsap/SplitText';


  // ============================================================
  // DOM
  // ============================================================
  let heroRoot;


  // ============================================================
  // SCREEN / RESPONSIVE
  // ============================================================
  let screenWidth = $state(0);
  let screenHeight = $state(0);

  let screenRatio = $derived(
    screenHeight > 0
      ? screenWidth / screenHeight
      : 1
  );

  let mobile = $derived(screenWidth <= 430);

  let tablet = $derived(
    screenWidth > 430 &&
    screenWidth <= 768
  );

  let desktop = $derived(
    screenWidth > 768
  );


  // ============================================================
  // HDRI ENVIRONMENT
  // ============================================================
  let environmentPromise = $state(null);

  $effect(() => {
    if (!navBarSettings.ready) return;

    const loader = new HDRLoader();

    environmentPromise = loader
      .loadAsync('/3d/sunset_1k.hdr')
      .then((texture) => {
        texture.mapping = EquirectangularReflectionMapping;
        return texture;
      });
  });


  // ============================================================
  // DRONE POSITION
  //
  // Start position is intentionally exaggerated.
  // It enters from lower/right and settles into the hero.
  // ============================================================

  let droneX = new Tween(16, {
    duration: 2300,
    easing: quintOut
  });

  let droneY = new Tween(-11, {
    duration: 2300,
    easing: quintOut
  });

  let droneZ = new Tween(5, {
    duration: 2300,
    easing: quintOut
  });


  // ============================================================
  // DRONE ROTATION
  // ============================================================

  let droneRotX = new Tween(0.12, {
    duration: 2200,
    easing: quintOut
  });

  let droneRotY = new Tween(-0.55, {
    duration: 2200,
    easing: quintOut
  });

  let droneRotZ = new Tween(-0.20, {
    duration: 2200,
    easing: quintOut
  });


  // ============================================================
  // RESPONSIVE FINAL DRONE POSITION
  // ============================================================

  let droneXTarget = $derived.by(() => {
    if (mobile) {
      return 2;
    }

    if (tablet) {
      return 1.5;
    }

    return 0;
  });


  let droneYTarget = $derived.by(() => {
    if (mobile) {
      return 3.1;
    }

    if (tablet) {
      return 2.4;
    }

    return 3;
  });


  let droneZTarget = $derived.by(() => {
    if (mobile) {
      return 0;
    }

    if (tablet) {
      return 0;
    }

    return 0;
  });


  let droneScale = $derived.by(() => {
    if (mobile) {
      return 2;
    }

    if (tablet) {
      return 2.4;
    }

    return 3;
  });


  // ============================================================
  // HERO READY -> DRONE ENTRANCE
  // ============================================================

  let droneStarted = $state(false);

  $effect(() => {
    if (!heroSettings.ready) return;
    if (droneStarted) return;

    droneStarted = true;

    droneX.target = droneXTarget;
    droneY.target = droneYTarget;
    droneZ.target = droneZTarget;

    // Drone starts banked and straightens while entering
    droneRotX.target = 0.15;
    droneRotY.target = -0.50;
    droneRotZ.target = 0.45;
  });


  // ============================================================
  // KEEP POSITION RESPONSIVE AFTER INITIAL ANIMATION
  // ============================================================

  $effect(() => {
    if (!droneStarted) return;

    droneX.target = droneXTarget;
    droneY.target = droneYTarget;
    droneZ.target = droneZTarget;
  });


  // ============================================================
  // MOUSE / POINTER PARALLAX
  // ============================================================

  let pointerX = $state(0);
  let pointerY = $state(0);

  function handlePointerMove(event) {
    if (!screenWidth || !screenHeight) return;

    // Range approximately -1 ... +1
    pointerX = (event.clientX / screenWidth - 0.5) * 2;
    pointerY = (event.clientY / screenHeight - 0.5) * 2;
  }


  // Small rotation only.
  // This keeps the drone feeling alive without becoming
  // a 3D model viewer.
  let finalRotX = $derived(
    droneRotX.current + pointerY * 0.025
  );

  let finalRotY = $derived(
    droneRotY.current + pointerX * 0.045
  );

  let finalRotZ = $derived(
    droneRotZ.current - pointerX * 0.025
  );


  // ============================================================
  // IDLE HOVER
  // ============================================================

  let hoverOffset = $state(0);
  let hoverRotation = $state(0);


  // ============================================================
  // GSAP ANIMATIONS
  // ============================================================

  function startHeroAnimation() {
    gsap.registerPlugin(SplitText);

    const context = gsap.context(() => {

      // --------------------------------------------------------
      // TITLE
      // --------------------------------------------------------

      const titleSplit = SplitText.create('.hero-title', {
        type: 'words'
      });

      gsap.from(titleSplit.words, {
        yPercent: 85,
        opacity: 0,
        rotateX: -18,
        duration: 1.15,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.2
      });


      // --------------------------------------------------------
      // UNIVERSITY LABEL
      // --------------------------------------------------------

      gsap.from('.hero-university', {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.65
      });


      // --------------------------------------------------------
      // HERO COPY
      // --------------------------------------------------------

      gsap.from('.hero-copy-line', {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: 'power4.out',
        delay: 1.05
      });


      // --------------------------------------------------------
      // CTA
      // --------------------------------------------------------

      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.45
      });


      // --------------------------------------------------------
      // BACKGROUND CLOUD ENTRANCE
      // --------------------------------------------------------

      gsap.from('.cloud-back', {
        y: 70,
        opacity: 0,
        scale: 1.03,
        duration: 2.4,
        ease: 'power3.out'
      });


      // --------------------------------------------------------
      // MID CLOUD ENTRANCE
      // --------------------------------------------------------

      gsap.from('.cloud-mid', {
        y: 90,
        opacity: 0,
        scale: 1.06,
        duration: 2.2,
        ease: 'power3.out'
      });


      // --------------------------------------------------------
      // FOREGROUND CLOUD ENTRANCE
      // --------------------------------------------------------

      gsap.from('.cloud-front', {
        y: 120,
        opacity: 0,
        scale: 1.08,
        duration: 2,
        ease: 'power3.out'
      });


      // --------------------------------------------------------
      // CLOUD PARALLAX
      //
      // Foreground moves fastest.
      // Background moves slowest.
      // --------------------------------------------------------

      gsap.to('.cloud-back', {
        x: -900,
        duration: 48,
        repeat: -1,
        ease: 'none'
      });

      gsap.to('.cloud-mid', {
        x: -900,
        duration: 31,
        repeat: -1,
        ease: 'none'
      });

      gsap.to('.cloud-front', {
        x: -900,
        duration: 19,
        repeat: -1,
        ease: 'none'
      });


      // --------------------------------------------------------
      // MORRISON / DISTANT LANDMARK
      // --------------------------------------------------------

      gsap.from('.morrison', {
        opacity: 0,
        y: 20,
        duration: 3,
        ease: 'power2.out'
      });

      gsap.to('.morrison', {
        xPercent: -6,
        duration: 35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });


      // --------------------------------------------------------
      // SCROLL INDICATOR
      // --------------------------------------------------------

      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 1,
        delay: 2
      });

      gsap.to('.scroll-line', {
        y: 10,
        opacity: 0.25,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });


      // --------------------------------------------------------
      // DRONE IDLE HOVER
      // --------------------------------------------------------

      const hoverState = {
        y: 0,
        rotation: 0
      };

      gsap.to(hoverState, {
        y: 0.18,
        rotation: 0.012,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',

        onUpdate: () => {
          hoverOffset = hoverState.y;
          hoverRotation = hoverState.rotation;
        }
      });

    }, heroRoot);

    return context;
  }


  // ============================================================
  // MOUNT
  // ============================================================

  onMount(() => {
    heroSettings.ready = false;

    const context = startHeroAnimation();

    return () => {
      context?.revert();
    };
  });
</script>


<!-- ============================================================
     WINDOW
============================================================ -->

<svelte:window
  bind:innerWidth={screenWidth}
  bind:innerHeight={screenHeight}
  onpointermove={handlePointerMove}
/>


<!-- ============================================================
     HERO
============================================================ -->

<div
  bind:this={heroRoot}
  class="
    relative
    w-screen
    h-screen
    min-h-[650px]
    overflow-hidden
    bg-white
  "
>


  <!-- ========================================================
       SKY
  ========================================================= -->

  <div
    class="
      absolute
      inset-0
      z-0
      bg-linear-to-t
      from-sky-100
      via-sky-200
      to-sky-500
    "
  ></div>


  <!-- ========================================================
       SUN / ATMOSPHERIC GLOW
  ========================================================= -->

  <div
    class="
      absolute
      inset-0
      z-[1]
      pointer-events-none
      bg-linear-to-bl
      from-yellow-100/70
      via-white/10
      to-transparent
      from-0%
      via-30%
      to-55%
    "
  ></div>


  <!-- ========================================================
       DISTANT LANDMARK
  ========================================================= -->

  <img
    src="/3d/morrison.webp"
    alt="UNT Discovery Park"
    class="
      morrison
      absolute
      bottom-16
      right-[5vw]
      z-[3]
      w-60
      md:w-80
      lg:w-96
      opacity-40
      blur-[2px]
      pointer-events-none
      select-none
    "
  />


  <!-- ========================================================
       DISTANT CLOUDS
  ========================================================= -->

  <div
    class="
      absolute
      bottom-28
      left-0
      z-[4]
      w-full
      pointer-events-none
      opacity-50
      blur-[2px]
    "
  >
    <div
      class="
        cloud-back
        h-52
        w-[3600px]
        bg-repeat-x
        bg-contain
      "
      style="
        background-image: url('/3d/clouds-bg.webp');
      "
    ></div>
  </div>


  <!-- ========================================================
       3D DRONE
  ========================================================= -->

  <div
    class="
      absolute
      inset-0
      z-[15]
      w-full
      h-full
      pointer-events-none
    "
  >
    <Canvas>

      {#if navBarSettings.ready}

        <SaeAero
          scale={droneScale}
          position={[
            droneX.current,
            droneY.current + hoverOffset,
            droneZ.current
          ]}
          rotation={[
            finalRotX,
            finalRotY,
            finalRotZ + hoverRotation
          ]}
        />

      {/if}


      <!-- ================================================
           HDRI LIGHTING
      ================================================= -->

      {#if environmentPromise}

        {#await environmentPromise then texture}

          <Environment {texture} />

        {/await}

      {/if}


      <!-- ================================================
           CAMERA

           Less telephoto than your original fov=18.
           This gives the drone more dimensionality.
      ================================================= -->

      {#if mobile}

        <T.PerspectiveCamera
          makeDefault
          position={[0, 3, 28]}
          fov={32}
        />

      {:else if tablet}

        <T.PerspectiveCamera
          makeDefault
          position={[-2, 3, 29]}
          fov={30}
        />

      {:else}

        <T.PerspectiveCamera
          makeDefault
          position={[-5, 3.5, 30]}
          fov={29}
        />

      {/if}

    </Canvas>
  </div>


  <!-- ========================================================
       MID CLOUDS
  ========================================================= -->

  <div
    class="
      absolute
      bottom-[-20px]
      left-0
      z-[20]
      w-full
      pointer-events-none
      opacity-75
      blur-[1px]
    "
  >
    <div
      class="
        cloud-mid
        h-56
        w-[3600px]
        bg-repeat-x
        bg-contain
        drop-shadow-xl
      "
      style="
        background-image: url('/3d/clouds-bg.webp');
      "
    ></div>
  </div>


  <!-- ========================================================
       HERO CONTENT
  ========================================================= -->

  <main
    class="
      relative
      z-30
      flex
      h-full
      w-full
      flex-col
      justify-between
      px-6
      pt-24
      pb-12
      md:px-12
      lg:px-16
      lg:pt-28
    "
  >

    <!-- ======================================================
         TOP
    ======================================================= -->

    <section
      class="
        max-w-[850px]
      "
    >

      <div class="overflow-hidden">

        <h1
          class="
            hero-title
            font-[Bronzier]
            font-bold
            uppercase
            leading-[0.82]
            tracking-[2px]
            text-unt-green
            text-[clamp(4.5rem,9vw,9rem)]
            text-shadow-lg
          "
        >
          UNT<br />
          Drone <br />
          Club
        </h1>

      </div>


      <p
        class="
          hero-university
          mt-5
          pl-1
          text-base
          font-light
          italic
          tracking-wide
          text-slate-700
          md:text-xl
        "
      >
        University of North Texas
        <span class="hidden sm:inline"> | </span>
        <span class="block sm:inline">
          College of Engineering
        </span>
      </p>

    </section>


    <!-- ======================================================
         BOTTOM COPY
    ======================================================= -->

    <section
      class="
        mb-14
        flex
        w-full
        flex-col
        items-start
        md:mb-8
        md:items-end
      "
    >

      <div
        class="
          max-w-xl
          md:text-right
        "
      >

        <div class="overflow-hidden">
          <p
            class="
              hero-copy-line
              text-3xl
              font-medium
              leading-tight
              tracking-tight
              text-slate-950
              md:text-4xl
              lg:text-5xl
            "
          >
            Ever wanted to
          </p>
        </div>


        <!-- <div class="overflow-hidden">
          <p
            class="
              hero-copy-line
              text-3xl
              font-medium
              leading-tight
              tracking-tight
              text-slate-950
              md:text-4xl
              lg:text-5xl
            "
          >
            Fly it.
          </p>
        </div> -->


        <div class="overflow-hidden">
          <p
            class="
              hero-copy-line
              text-3xl
              font-medium
              leading-tight
              tracking-tight
              text-unt-green
              md:text-4xl
              lg:text-5xl
            "
          >
            Fly farther?
          </p>
        </div>


        <!-- ==================================================
             CTA
        =================================================== -->

        <div
          class="
            hero-cta
            mt-7
            flex
            md:justify-end
          "
        >

          <a
            href="#contact"
            class="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-unt-green
              px-6
              py-3
              text-lg
              font-medium
              text-white
              shadow-lg
              shadow-black/10
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              active:translate-y-0
            "
          >
            Join the Club

            <span
              class="
                text-xl
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </a>

        </div>

      </div>

    </section>

  </main>


  <!-- ========================================================
       FOREGROUND CLOUD
       Intentionally overlaps the drone slightly.
  ========================================================= -->

  <div
    class="
      absolute
      bottom-[-105px]
      left-0
      z-[35]
      w-full
      pointer-events-none
      opacity-90
      blur-[0.5px]
    "
  >

    <div
      class="
        cloud-front
        h-64
        w-[3600px]
        bg-repeat-x
        bg-contain
        drop-shadow-2xl
      "
      style="
        background-image: url('/3d/clouds-bg.webp');
      "
    ></div>

  </div>


  <!-- ========================================================
       DECORATIVE PROPELLERS
  ========================================================= -->

  <TablerPropeller
    class="
      absolute
      left-5
      top-5
      z-40
      size-5
      text-slate-800/50
    "
  />

  <TablerPropeller
    class="
      absolute
      right-5
      top-5
      z-40
      size-5
      text-slate-800/50
    "
  />

  <!-- ========================================================
       VERY LIGHT SCREEN VIGNETTE
  ========================================================= -->

  <div
    class="
      absolute
      inset-0
      z-[45]
      pointer-events-none
      bg-radial-[at_50%_45%]
      from-transparent
      via-transparent
      to-slate-900/5
    "
  ></div>

</div>
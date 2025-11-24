<!-- Root Layout Nav Bar -->
<!-- HOME -->
<!-- MEMBERS -->
<!-- PROJECTS -->
<!-- SPONSORS -->
<script>
	//BITS-UI Components
	import { DropdownMenu } from 'bits-ui';

	//ICONS
	import MdiInstagram from '~icons/mdi/instagram';
	import MdiFacebook from '~icons/mdi/facebook';
	import RiArrowDownSLine from '~icons/ri/arrow-down-s-line';
  import IcBaselineDiscord from '~icons/ic/baseline-discord';
  import MdiLinkedin from '~icons/mdi/linkedin';

	// import unt_logo from '$lib/assets/unt_logo.png';
	import { page } from '$app/state';
  import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { gsap } from 'gsap';
	let pathname = $derived(page.url.pathname);

  // Global variables
  import { navBarSettings } from '$lib/components/navbarSettings.svelte.js';

  // Animation
  onMount(() => {
    if (pathname == '/') {
      gsap.fromTo(".navBar", {opacity: 0, y: -40 }, {y:0, opacity: 1, duration: 1, ease: 'expo.out', onComplete: () => {
        navBarSettings.ready = true;
      }});
    } else {
      navBarSettings.ready = true;
    }
  })

	let scrollY = $state(0);
  $effect(() => {
		if (pathname == '/') {
			if (scrollY < 200) {
        // navBarSettings.clear = true;
			} else {
        navBarSettings.clear = false;
			}
		} else {
      navBarSettings.clear = false;
		}
  })
	let altNavbar = $derived(!navBarSettings.clear);

	let navigating = $state(false);
	beforeNavigate(() => {
		navigating = true;
	});
	afterNavigate(() => {
		navigating = false;
	});

	//Handles open menu
	let menuOpen = $state(false);
</script>

<!-- SCROLL TRACKING -->
<svelte:window bind:scrollY />

<!-- MAIN NAVBAR DISPLAY -->
<div
	class="navBar fixed z-50 flex h-20 w-full flex-row items-center justify-between border-b-1 border-b-white/30 py-2 text-white shadow-xl
  backdrop-blur-xs transition-colors"
	class:duration-250={!navigating}
	class:duration-0={navigating}
	class:bg-black={altNavbar}
  class:opacity-0={pathname == '/'}
>
	<!-- LEFT ALIGNED NAVIGATION-->
	<div class="mx-8 flex h-full flex-row items-center gap-8">
    <!-- DRONE CLUB LOGO -->
		<img src="logo/untLogo.png" alt="UNT Logo" class="h-full object-contain" />

		<!-- NAVIGATION LINKS -->
		<div class="gap-4 font-[Bronzier] text-xl italic hidden sm:flex" >
			<a class="group transition-colors duration-100 hover:text-green-300" href="/">
				HOME
				<span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full"
				></span>
			</a>

			<!-- <button onclick={openMenu} class="flex cursor-pointer items-center"> -->
			<!-- 	ABOUT -->
			<!-- 	<RiArrowDownSLine /> -->
			<!-- </button> -->
			<!-- <DropdownMenu.Root bind:open={menuOpen}> -->
			<!-- 	<DropdownMenu.Trigger -->
			<!-- 		class="group flex cursor-pointer items-center transition-all hover:text-green-300" -->
			<!-- 	> -->
			<!-- 		<p> -->
   <!--          ABOUT -->
   <!--          <span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full" -->
   <!--          ></span> -->
   <!--        </p> -->
			<!-- 		<div class:rotate-90={menuOpen} class="transition-all"> -->
			<!-- 			<RiArrowDownSLine /> -->
			<!-- 		</div> -->
			<!-- 	</DropdownMenu.Trigger> -->
			<!-- 	<DropdownMenu.Portal> -->
			<!-- 		<DropdownMenu.Content -->
			<!-- 			class="relative z-60 rounded-xl bg-green-700 px-4 py-2 shadow-xl" -->
			<!-- 			sideOffset={1} -->
			<!-- 			forceMount -->
			<!-- 		> -->
			<!-- 			{#snippet child({ wrapperProps, props, open })} -->
			<!-- 				{#if open} -->
			<!-- 					<div {...wrapperProps} class="font-[Bronzier] text-xl text-white"> -->
			<!-- 						<div {...props} transition:fly={{ y: -5 }}> -->
			<!-- 							<DropdownMenu.Item> -->
			<!-- 								<a href="/history" class="transition-all duration-100 hover:text-green-300" -->
			<!-- 									>History</a -->
			<!-- 								> -->
			<!-- 							</DropdownMenu.Item> -->
			<!-- 							<DropdownMenu.Item> -->
			<!-- 								<a href="/projects" class="transition-all duration-100 hover:text-green-300" -->
			<!-- 									>Projects</a -->
			<!-- 								> -->
			<!-- 							</DropdownMenu.Item> -->
			<!-- 						</div> -->
			<!-- 					</div> -->
			<!-- 				{/if} -->
			<!-- 			{/snippet} -->
						<!-- <DropdownMenu.Item -->
						<!--   class="font-[Bronzier] text-white text-xl"  -->
						<!-- > -->
						<!--   <p>TEST</p> -->
						<!-- </DropdownMenu.Item> -->
			<!-- 		</DropdownMenu.Content> -->
			<!-- 	</DropdownMenu.Portal> -->
			<!-- </DropdownMenu.Root> -->

			<a href="/projects" class="group transition-colors duration-100 hover:text-green-300">
          PROJECTS
        <span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full"
				></span>
      </a>
			<a href="/members" class="group transition-colors duration-100 hover:text-green-300">
        MEMBERS
        <span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full"
				></span>
      </a>
			<a href="/sponsors" class="group transition-colors duration-100 hover:text-green-300">
        SPONSORS
        <span class="-mt-1 block h-[1px] max-w-0 bg-green-600 transition-all group-hover:max-w-full"
				></span>
      </a>
		</div>
	</div>

	<!-- RIGHT ALIGNED SOCIALS -->
	<div class="mr-4 flex flex-row items-center gap-2">
		<!-- INSTAGRAM -->
		<a href="https://www.instagram.com/meangreenracing/?hl=en" target="_blank">
			<MdiInstagram class="size-6" />
		</a>

		<!-- FACEBOOK -->
		<a href="https://www.facebook.com/UNTMeanGreenRacing/" target="_blank">
			<MdiFacebook class="size-6" />
		</a>

    <!-- DISCORD -->
    <a href="https://discord.gg/2PckGJCbmp" target="_blank">
      <IcBaselineDiscord class="size-6" />
    </a>

    <!-- LINKEDIN -->
    <a href="https://www.linkedin.com/company/fsae-unt-mean-green-racing/" target="_blank">
      <MdiLinkedin class="size-6" />
    </a>
	</div>
</div>

<style>
	/* a:hover { */
	/* 	color: oklch(62.7% 0.194 149.214); */
	/* 	transition: color 0.1s ease-in-out; */
	/* } */
</style>

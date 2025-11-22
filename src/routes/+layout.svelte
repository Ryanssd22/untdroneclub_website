<!-- ROOT LAYOUT -->
<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

	import { page } from '$app/state';
	let pathname = $derived(page.url.pathname);

	let { children } = $props();

  // Navbar animation
  onMount(() => {
    // gsap.to(".navBar", {y: -30, duration:2});
  })

	// Navigation Links
	// const navLinks = [
	// 	{ url: '/', name: 'Home' },
	// 	{ url: '/', name: 'About' },
	// 	{ url: 'members', name: 'Members' }
	// ];
</script>

<svelte:head>
	<link rel="icon" href="logo/untLogoEagle.png" />
</svelte:head>

<!-- FULL DIV -->
<div class="flex w-full overflow-x-hidden font-[Montserrat]">
	<!-- NAVBAR -->
  <NavBar />

	<!-- MAIN CONTENT -->
	<div class="h-full w-full" class:mt-20={pathname != '/'}>
		{@render children?.()}

		<!-- FOOTER -->
		<div class="relative z-30 flex w-full bg-green-700 px-16 py-8 text-white">
			<!-- NAVIGATION LINKS -->
			<div class="flex flex-col">
				<h2 class="font-bold">Navigate</h2>
				<ul class="list-disc">
					<!-- {#each navLinks as link, i (i)} -->
					<!-- 	<li> -->
					<!-- 		<a href={link.url}>{link.name}</a> -->
					<!-- 	</li> -->
					<!-- {/each} -->
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <p>About</p>
            <ul class="list-disc list-inside">
              <li>
                <a href="/history">History</a>
              </li>
              <li>
                <a href="/cars">Cars</a>
              </li>
              <li>
                <a href="/spotlight">Senior Spotlight</a>
              </li>
              <li>
                <a href="/designs">Senior Designs</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/members">Members</a>
          </li>
          <li>
            <a href="/sponsors">Sponsors</a>
          </li>
				</ul>
			</div>

			<!-- COPYRIGHT -->

			<!-- SOCIAL MEDIA -->
		</div>
	</div>
</div>

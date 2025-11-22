<!-- MAIN PAGE HERO IMAGE -->
<script>
	// This component is the full screen hero image background.
	// Every few seconds this image changes to a new one
	// Preemtively loads in a "preloadedImage" for quick transitions
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintIn, quintOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';

	//Image imports
	import firstImage from '$lib/assets/photos/hero/starting.webp';
	const heroImages = import.meta.glob('/src/lib/assets/photos/hero/*.webp');

	const IMAGE_TIMEOUT = 3000;

	let scrollY = $state(0);
	let viewportHeight = $state(0);
	let preloadedImage = $state(firstImage);
	let currentImage = $state(firstImage);
	let heroImagesValues = Object.values(heroImages);

	let randomImageTimeout = null;
	onMount(async () => {
		console.log('Mounting, choosing first image...');

		await chooseRandomImage();
		setImageTimeout();
	});
	async function setImageTimeout() {
		if (!timeoutStop) {
			randomImageTimeout = setTimeout(async () => {
				await chooseRandomImage();
				setImageTimeout();
			}, IMAGE_TIMEOUT);
		}
	}

	//Start and stop timeout handling
	let timeoutStop = false;
	$effect(() => {
		if (scrollY > viewportHeight && !timeoutStop) {
			console.log('TIMEOUT STOP');
			clearTimeout(randomImageTimeout);
			timeoutStop = true;
		}
		if (scrollY < viewportHeight && timeoutStop) {
			console.log('TIMEOUT START');
			timeoutStop = false;
			setImageTimeout();
		}
	});

	$inspect('CURRENT IMAGE: ', currentImage);

	// Chooses random image from heroImagesValues
	async function chooseRandomImage() {
		console.log('Choosing Image...');

		// Setting current image
		currentImage = preloadedImage;

		// Preloading next image
		const index = Math.floor(Math.random() * heroImagesValues.length);
		let imageModule = await heroImagesValues[index]();
		preloadedImage = imageModule.default;

		console.log('Preloaded Image', index);
	}

	//Disables transitions and hero timeout
	let navigating = $state(false);
	beforeNavigate(() => {
		navigating = true;
    clearTimeout(randomImageTimeout);
    console.log("TIMEOUT CLEARED");
	});
</script>

<!-- SCROLL & HEIGHT TRACKING -->
<svelte:window bind:scrollY bind:innerHeight={viewportHeight} />

<div class="relative h-screen w-full overflow-hidden bg-black">
	{#if preloadedImage}
		<img
			alt="Hero"
			src={preloadedImage}
			class="absolute inset-0 h-full w-full object-cover opacity-0"
		/>
	{/if}
	{#if currentImage}
		{#key currentImage}
			<img
				alt="Hero"
				src={currentImage}
				in:fly|global={!navigating ? { y: 25, duration: 2000, easing: quintOut } : { duration: 0 }}
				out:fly|global={!navigating ? { duration: 4000, easing: quintIn } : { duration: 0 }}
				class="heroImg absolute inset-0 h-full w-full object-cover brightness-95"
			/>
		{/key}
	{:else}
		<!-- <p>Loading...</p> -->
	{/if}

</div>

<style>
  .heroImg::after {
   content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0px 0px 85px rgba(0, 0, 0, 0.8);
  }
</style>



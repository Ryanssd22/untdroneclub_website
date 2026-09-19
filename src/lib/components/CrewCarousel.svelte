<!-- CREW CAROUSEL -->
<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import AutoScroll from 'embla-carousel-auto-scroll';
	import headshot_descriptions from '$lib/headshot_descriptions.json';
	import eagle_image from '$lib/assets/unt_logo_eagle.webp';

	let emblaApi;
	const options = {
		loop: true,
		startIndex: 1,
		dragFree: true
	};
	const plugins = [AutoScroll({ speed: 1 })];

	//Convert headshot_descriptions into array of members
	let headshot_members = $state([]);
	let current_year = $state(0);
	// let image_prefix = headshot_descriptions[current_year].image_prefix;
	let image_prefix = "headshots/"
	headshot_descriptions[current_year].details.forEach((position) => {
		let members = position.members;
		headshot_members = headshot_members.concat(members);
	})

	//Initializes Embla API
	function onInit(event) {
		emblaApi = event.detail;
		console.log('EmblaAPI:', emblaApi);
	}

	//Scrolling
	function scrollPrev() {
		console.log('SCROLLING PREVIOUS');
		if (emblaApi) emblaApi.scrollPrev();
	}
	function scrollNext() {
		if (emblaApi) emblaApi.scrollNext();
	}
</script>

<div class="embla w-full">
	<!-- CAROUSEL -->
	<div
		class="embla__viewport relative"
		use:emblaCarouselSvelte={{ options, plugins }}
		onemblaInit={onInit}
	>
		<div class="embla__container my-2">
			{#each headshot_members as member (member.name)}
				<div class="embla__slide flex-center flex w-full items-center">
					<div class="m-auto flex flex-col">
						<!-- HEADSHOT COMPONENT -->
            <div class="flex flex-col flex-center items-center">
              <!-- TRANSFORMS DIV -->
              <div class="group relative h-35 w-30 sm:h-70 sm:w-60 hover:rotate-1 hover:scale-104 transition-all duration-800">
                
                <!-- CLIP DIV -->
                <div class="absolute inset-0 rounded-md" style="clip-path: inset(-50px 0px 0px 0px);">
                  
                  <!-- GRADIENT BACKGROUND -->
                  <div in:fly={{ y:5 }} class="absolute inset-0 bg-gradient-to-t from-green-700 from-10% to-85% to-white/0 z-0 transition-colors group-hover:from-green-600">
                    <img src={eagle_image} alt="" class="absolute w-20 pl-1 pt-5 opacity-40" />
                  </div>

                  <!-- HEADSHOT IMAGE -->
                  {#if member.image_hover}
                    <img in:fly={{ y:5, delay: 50*i }} src={"/headshots/" + member.image} alt={member.name} class="absolute inset-0 z-30 h-full w-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-0" />
                    <img
                      src={"/headshots/" + member.image_hover}
                      alt="{member.name}"
                      class="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                    />
                  {:else}
                    <img in:fly={{ y:5, delay: 50*i }} src={"/headshots/" + member.image} alt={member.name} class="absolute inset-0 z-30 h-full w-full object-cover transition-all duration-300 group-hover:scale-110 origin-bottom" />
                  {/if}
                  
                </div>
              </div>

              <h2 class="font-bold text-lg">{member.name}</h2>
              <h3 class="italic">{member.title}</h3>
              <p>{member.description}</p>
            </div>
					</div>
				</div>
			{/each}
		</div>

		<!-- GRADIENT -->
		<!-- <div -->
		<!-- 	class="from-1% to-99% absolute inset-0 h-full w-full bg-gradient-to-r from-white via-white/0 via-50% to-white" -->
		<!-- ></div> -->
	</div>

	<!-- BUTTONS -->
	<!-- <div class="flex gap-2"> -->
	<!-- 	<button class="embla__prev cursor-pointer" onclick={scrollPrev}>Prev</button> -->
	<!-- 	<button class="embla__next cursor-pointer" onclick={scrollNext}>Next</button> -->
	<!-- </div> -->
</div>

<style>
	.embla {
		overflow: visible;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 80%;
		min-width: 0;
	}

	/* TABLET */
	@media (width >= 48rem) {
		.embla__slide {
			flex: 0 0 28%;
		}
	}

	/* DESKTOP SITE */
	@media (width >= 64rem) {
		.embla__slide {
			flex: 0 0 20%;
		}
	}
</style>

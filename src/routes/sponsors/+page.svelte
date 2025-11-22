<!-- SPONSORS PAGE -->
<script>
  import PageHeader from '$lib/components/PageHeader.svelte';
	import { fly } from 'svelte/transition';
	import sponsors from '$lib/sponsors/sponsors.json';
	const sponsor_images = import.meta.glob('$lib/sponsors/*.webp');
</script>

<!-- CONTENT -->
<div class="p-4">
	<p>
		Thanks to our generous sponsors, Mean Green Racing is able to turn innovative designs into a
		reality. Your support empowers our students with invaluable hands-on experience, helping to
		build the next generation of engineering professionals. Your belief in our team really drives us
		forward, and we couldn't be more grateful for your partnership in our pursuit of racing
		excellence.
	</p>

	<!-- SPONSOR GRID -->
	<div class="grid grid-cols-3 gap-4 mt-4">
		{#each sponsors as sponsor (sponsor.name)}
			<div class="flex flex-col justify-center">
				{#await sponsor_images[`/src/lib/sponsors/${sponsor.image}`]() then { default: src }}
					<img {src} alt={sponsor.name} class="w-50" />
				{/await}
			</div>
		{/each}
	</div>
</div>

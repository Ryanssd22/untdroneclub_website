<!-- CHECKERBOARD PATTERN -->
<!-- https://svelte.dev/playground/48d889e1263747cab08a46c07557a901?version=5.19.10 -->

<div class="checkerboard opacity-10" style="--size: 50px"></div>

<style>
	.checkerboard {
		--color1: hsl(0 0% 50%);
		--color2: hsl(0 0% 90%);
/* 		--size: 50px; */
		
		width: 100%;
		height: 100%;
		
		background-image:
			linear-gradient(45deg, var(--color1) 25%, transparent 25%, transparent 75%, var(--color1) 75%),
  		linear-gradient(45deg, var(--color1) 25%, var(--color2) 25%, var(--color2) 75%, var(--color1) 75%);
		
		background-size: var(--size) var(--size);
		
		background-position:
			0 0,
			calc(var(--size)/2) calc(var(--size)/2);
		
	}
</style>

/*
 * Global variables for NavBar.svelte
 * This is made so that I can edit some properties from the page, layout, and navbar itself
 * This helps with global loading
 **/

export const navBarSettings = $state({
  ready: false, // AKA Navbar is visible on screen
  clear: false, // Black or clear
});

// Loads in project name params for specific project page
import crazyflie from "$lib/projects/markdown/crazyflie.md?raw";
import stingray from "$lib/projects/markdown/stingray.md?raw";

export async function load({ params }) {
  const { project } = params;
  let markdown = undefined;
  if (project == "crazyflie") {
    markdown = crazyflie;
  } else if (project == "stingray") {
    markdown = stingray;
  }
  return {
    markdown,
  };
}

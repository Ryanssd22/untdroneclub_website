// Loads in project name params for specific project page
import crazyflie from "$lib/projects/markdown/crazyflie.md?raw";
import stingray from "$lib/projects/markdown/stingray.md?raw";
import racing from "$lib/projects/markdown/racing.md?raw";
import saeaero from "$lib/projects/markdown/saeaero.md?raw";

export async function load({ params }) {
  const { project } = params;
  let markdown = undefined;
  if (project == "crazyflie") {
    markdown = crazyflie;
  } else if (project == "stingray") {
    markdown = stingray;
  } else if (project == "racing") {
    markdown = racing;
  } else if (project == "saeaero") {
    markdown = saeaero;
  }
  return {
    markdown,
  };
}

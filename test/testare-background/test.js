let vh, vw, viewportHeight, viewportWidth, totalHeight, scrollTop;

function updateMeasurements() {
  vh = window.innerHeight / 2;
  vw = window.innerWidth / 2;
  viewportHeight = window.innerHeight;
  viewportWidth = window.innerWidth;
  totalHeight = document.documentElement.scrollHeight;
  scrollTop = window.scrollY;

  console.log(viewportHeight, scrollTop);
  activateParallax();
}

window.addEventListener("scroll", updateMeasurements);
window.addEventListener("resize", updateMeasurements);

// Initial call to set values
updateMeasurements();

function activateParallax() {
  if (scrollTop >= 0 && scrollTop < 132 * vh) {
    console.log("sectiunea unu");
  }
  if (scrollTop >= 44 * vh && scrollTop < 216 * vh) {
    console.log("sectiunea doi");
  }
}

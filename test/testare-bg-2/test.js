document.addEventListener("DOMContentLoaded", () => {
  handleScroll();
});

let lastScrollY = 0;

function handleScroll() {
  const sections = document.querySelectorAll(".parallax-section");

  // Get the scroll direction
  const scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
  lastScrollY = window.scrollY;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;

    let isInView = false;

    // For the first section, check if its top is visible
    if (index === 0) {
      isInView = true;
    }
    // For the last section, check if its bottom is visible
    else if (index === sections.length - 1) {
      isInView = true;
    }
    // For all other sections, check if at least half is visible
    else {
      isInView = rect.top <= window.innerHeight && rect.bottom >= window.innerHeight;
    }

    if (isInView) {
      const offset = window.scrollY - section.offsetTop; // Calculate the offset for the section

      const speed = section.classList.contains("section-1")
        ? [0, 0.3, 0.6, 0.8]
        : section.classList.contains("section-2")
        ? [0, 0.2]
        : section.classList.contains("section-3")
        ? [0, 0.12, 0.4]
        : [0.1, 0.2, 0.3]; // Default speed for other sections

      const speed1 = speed[0] ? `${offset * speed[0]}px` : "";
      const speed2 = speed[1] ? `${offset * speed[1]}px` : "";
      const speed3 = speed[2] ? `${offset * speed[2]}px` : "";
      const speed4 = speed[3] ? `${offset * speed[3]}px` : "";

      if (section.classList.contains("section-1")) {
        section.style.backgroundImage = `url("/Project2/Assets/UsedParallaxTrees.png"),
        url("/Project2/Assets/UsedParallaxBuildings.png"),
        url("/Project2/Assets/UsedParallaxMoon2.png"),
        url("/Project2/Assets/UsedParallaxNightSky.png")`;
        section.style.backgroundPosition = `center ${speed1}, 
        center ${speed2}, 
        right top ${speed3}, 
        center ${speed4}`;
      } else if (section.classList.contains("section-2")) {
        section.style.backgroundImage = `url("/Project2/Assets/podInchis.png"), url("/Project2/Assets/UsedParallaxTreesReflection.png"), linear-gradient(189deg, #5e5d45, #241b38, #0a0f28, #0a0f28)`;
        section.style.backgroundPosition = `left top ${speed2}, center top ${speed1}`;
      } else if (section.classList.contains("section-3")) {
        section.style.background = `url('section3-image1.png') no-repeat center center ${speed1},
        url('section3-image2.png') no-repeat center center ${speed2}`;
      }
    }
  });
}

window.addEventListener("scroll", handleScroll);

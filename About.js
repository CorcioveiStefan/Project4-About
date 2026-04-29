let isPlaying = false;
// code for player
document.addEventListener("DOMContentLoaded", () => {
  const profile = document.getElementById("profile");
  const arm = document.getElementById("arm-container");
  const circle = document.querySelector(".circle");
  const center = document.querySelector(".center");
  const playButton = document.getElementById("play-button");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const audio = document.getElementById("audio");
  const widget = SC.Widget(audio);

  widget.bind(SC.Widget.Events.ERROR, function (e) {
    console.error("Error occurred:", e);
  });

  prevButton.addEventListener("click", () => {
    if (!isPlaying) return;

    widget.pause();
    widget.getCurrentSoundIndex((index) => {
      setTimeout(() => {
        if (index === 0) {
          widget.skip(7);
        } else {
          widget.prev();
        }
      }, 200);
    });
  });

  nextButton.addEventListener("click", () => {
    if (!isPlaying) return;

    widget.pause();
    widget.getCurrentSoundIndex((index) => {
      setTimeout(() => {
        if (index === 7) {
          widget.skip(0);
        } else {
          widget.next();
        }
      }, 200);
    });
  });

  playButton.addEventListener("click", () => {
    playImg = document.querySelector("#play-button");
    if (!isPlaying) {
      widget.play();
      profile.classList.add("spinning");
      arm.style.transform = "rotate(23deg)";
      circle.style.display = "block";
      center.style.display = "block";
      audio.style.visibility = "visible";
      playImg.src = "Assets/UsedButtonStop.png";
    } else {
      widget.pause();
      widget.seekTo(0);
      profile.classList.remove("spinning");
      arm.style.transform = "rotate(0deg)";
      circle.style.display = "none";
      center.style.display = "none";
      audio.style.visibility = "hidden";
      playImg.src = "Assets/UsedButtonPlay.png";
    }
    isPlaying = !isPlaying;
  });
});
// code to keep the bg appearance
function updateBackground() {
  let scrollTop = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight;
  const vw = window.innerWidth / 100;
  const vh = window.innerHeight / 100;
  parallaxUnu = document.querySelector(".container-profile");
  parallaxDoi = document.querySelector(".container-nd");

  parallaxUnu.style.backgroundPosition = `center bottom, center bottom -${scrollTop * 0.2}px, right ${scrollTop * 0.7}px, center ${scrollTop * 0.9}px`;

  if (vw > vh) {
    parallaxDoi.style.backgroundSize = ` cover , cover, 15vw ${15 * vw + scrollTop * 0.1}px, cover`;
    parallaxDoi.style.backgroundPosition = ` left bottom ${20 - scrollTop * 0.1}px  ,center top, right 50px top ${36 + scrollTop * 0.1}px, center`;
    if (vw / vh <= 1.5) {
      parallaxUnu.style.backgroundSize = `cover, cover, 20vw auto, cover`;
    } else if (vw / vh > 1.5 && vw / vh < 2) {
      parallaxUnu.style.backgroundSize = `cover, cover, 18vw auto, cover`;
    } else if (vw / vh >= 2) {
      parallaxUnu.style.backgroundSize = `cover, cover, 16vw auto, cover`;
    }
  } else if (vw < vh) {
    parallaxDoi.style.backgroundSize = `  cover,cover, 30vw ${30 * vw + scrollTop * 0.15}px , cover`;
    parallaxDoi.style.backgroundPosition = ` left bottom ${20 - scrollTop * 0.1}px,center top, right 10px top ${scrollTop * 0.15}px , center`;
    if (vh / vw <= 1.5) {
      parallaxUnu.style.backgroundSize = `cover, cover, 27vw auto, cover`;
    } else if (vh / vw > 1.5 && vh / vw < 2) {
      parallaxUnu.style.backgroundSize = `cover, cover, 30vw auto, cover`;
    } else if (vh / vw >= 2) {
      parallaxUnu.style.backgroundSize = `cover, cover, 33vw auto, cover`;
    }
  }
}
// call to keep track of scrool and resize actions
window.addEventListener("scroll", updateBackground);
window.addEventListener("resize", updateBackground);
updateBackground();
// observer to create an jump in and fade in effect for title and text in each section
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target.classList.contains("text")) {
      entry.target.style.opacity = entry.isIntersecting ? 1 : 0;
    } else if (entry.target.classList.contains("title")) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        entry.target.classList.remove("hidden");
      } else {
        entry.target.classList.add("hidden");
        entry.target.classList.remove("active");
      }
    }
  });
});
document.querySelectorAll(".text, .title").forEach((element) => observer.observe(element));
// code to open thanks pop up in the footer
document.getElementById("openPopup").addEventListener("click", function (event) {
  event.preventDefault(); // Prevents link navigation
  document.getElementById("popup").style.display = "flex";
});
// code to close the mentioned code
document.getElementById("closePopup").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
});
// function for the menu in the nav when hit small screen
function toggleMenu() {
  const menu = document.getElementById("nav-link");
  menu.classList.toggle("open"); // Toggle the "hidden" class
}
// code to change the section, when selected in the nav
function showSection(sectionId) {
  const menu = document.getElementById("nav-link");
  document.querySelectorAll("main, section").forEach((sec) => (sec.style.display = "none"));
  document.getElementById(sectionId).style.display = "block";
  menu.classList.remove("open");
}
function initSlider(sliderId) {
  let slideIndex = 1;
  const container = document.getElementById(sliderId);
  const slides = container.getElementsByClassName("my-slides");
  const dots = container.parentElement.querySelectorAll(".slide-dot");

  function showSlides(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    Array.from(slides).forEach((slide) => (slide.style.display = "none"));
    dots.forEach((dot) => dot.classList.remove("active-slide"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1]?.classList.add("active-slide");
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  showSlides(slideIndex);
  return { plusSlides, currentSlide };
}
// Initial call for each slider
const sliders = {
  slider1: initSlider("slider1"),
  slider2: initSlider("slider2"),
};
// knob
const knob = document.getElementById("knob-container");
let isDragging = false;
const MIN_ROTATION = -180; // Minimum rotation
const MAX_ROTATION = 0; // Maximum rotation
const audio = document.getElementById("audio");
const widget = SC.Widget(audio);

// Initialize the knob
initializeKnob();

// Event listeners for dragging
knob.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

// Initialize the knob's rotation and volume
function initializeKnob() {
  updateKnobRotation(MAX_ROTATION); // Start at 0° for 100% volume
  updateVolume(100); // Set initial volume to 100%
}

// Mouse down event handler
function onMouseDown() {
  isDragging = true; // Start dragging
}

// Mouse move event handler
function onMouseMove(e) {
  if (isDragging) {
    const currentAngle = getAngle(e);
    const newRotation = clamp(currentAngle, MIN_ROTATION, MAX_ROTATION);

    // Update knob rotation and volume based on new angle
    updateKnobRotation(newRotation);
    updateVolume(mapRotationToVolume(newRotation));
  }
}

// Mouse up event handler
function onMouseUp() {
  isDragging = false; // Stop dragging
}

// Get the angle based on mouse position
function getAngle(event) {
  const rect = knob.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  return Math.atan2(y, x) * (180 / Math.PI);
}

// Clamp a value between a minimum and maximum
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Map rotation to volume percentage
function mapRotationToVolume(rotation) {
  let result = Math.round(((rotation + 180) / 180) * 100);
  widget.setVolume(result);
  return result; // Map to 0-100
}

// Update the knob's rotation
function updateKnobRotation(rotation) {
  knob.style.transform = `rotate(${rotation}deg)`;
}

// Update volume (replace with your widget update logic)
function updateVolume(volume) {
  console.log("Volume:", volume);
}

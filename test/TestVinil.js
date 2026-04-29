let isPlaying = false;

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
    if (isPlaying != true) return;
    else {
      widget.getCurrentSoundIndex((index) => {
        if (index == 0) {
          widget.skip(7);
        } else {
          widget.prev();
        }
      });
      audio.style.opacity = "1";
    }
  });

  nextButton.addEventListener("click", () => {
    if (isPlaying != true) return;
    else {
      widget.getCurrentSoundIndex((index) => {
        if (index == 7) {
          widget.skip(0);
        } else {
          widget.next();
        }
      });

      audio.style.opacity = "1";
    }
  });

  playButton.addEventListener("click", () => {
    if (!isPlaying) {
      widget.play();
      profile.classList.add("spinning");
      arm.style.transform = "rotate(23deg)";
      circle.style.display = "block";
      center.style.display = "block";
      audio.style.opacity = "1";
    } else {
      widget.pause();
      widget.seekTo(0);
      profile.classList.remove("spinning");
      arm.style.transform = "rotate(0deg)";
      circle.style.display = "none";
      center.style.display = "none";
      audio.style.opacity = "0";
    }
    isPlaying = !isPlaying;
  });
});

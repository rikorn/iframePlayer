const urlParams = new URLSearchParams(window.location.search);
const file = urlParams.get("file");
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const timeText = document.getElementById("timeText");

if (file) {
  audio.src = "audio/" + file;

  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  });

  audio.addEventListener("play", () => {
    isPlaying = true;
    playBtn.textContent = "⏸";
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    playBtn.textContent = "▶";
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    playBtn.textContent = "▶";
  });

  audio.addEventListener("timeupdate", () => {
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration);
    timeText.textContent = `${current} / ${total}`;
  });

} else {
  playBtn.disabled = true;
  timeText.textContent = "Ingen ljudfil";
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const observer = new MutationObserver(() => {
  const style = window.getComputedStyle(document.body);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
    audio.pause();
    audio.currentTime = 0;
  }
});

observer.observe(document.body, {
  attributes: true,
  attributeFilter: ["style", "class"]
});




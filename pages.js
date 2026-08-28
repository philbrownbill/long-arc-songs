const genres = {
  pop: ["01", "Contemporary Pop", "Direct, melodic songs built around distinctive ideas and unforgettable choruses."],
  country: ["02", "Country & Americana", "Character-led writing, lived-in detail and stories that earn their emotional payoff."],
  soul: ["03", "Soul & R&B", "Vocal-first songs with emotional weight, rhythmic confidence and room for a great performance."],
  folk: ["04", "Pop-Folk & Acoustic", "Warm, intimate songs where lyric, melody and the human voice stay close to the surface."],
  "big-band": ["05", "Big Band & Jazz-Pop", "Bold, sophisticated songs imagined with brass, swing and commanding lead vocals."],
  "adult-contemporary": ["06", "Adult Contemporary", "Timeless melodies, mature perspectives and emotionally resonant ballads."]
};

document.querySelectorAll(".waveform").forEach((wave) => {
  wave.dataset.pattern.split(",").forEach((height) => {
    const bar = document.createElement("span");
    bar.style.height = `${height}px`;
    wave.appendChild(bar);
  });
});

const panel = document.querySelector(".genre-panel");
document.querySelectorAll("[data-genre]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-genre]").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    const [number, title, description] = genres[button.dataset.genre];
    panel.querySelector(".genre-number").textContent = number;
    panel.querySelector("h3").textContent = title;
    panel.querySelector(".genre-copy p").textContent = description;
    panel.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 300 });
  });
});

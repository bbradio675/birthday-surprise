
const quietUnlock = document.getElementById("quietUnlock");
const quietRiddleArea = document.getElementById("quietRiddleArea");
const keepReadingButton = document.querySelector(".keep-reading-button");
const finalSurpriseButton = document.querySelector(".final-surprise-button");
const birthdayPage = document.querySelector(".birthday-page");
const lightCandlesButton = document.getElementById("lightCandlesButton");
const birthdayMessage = document.getElementById("birthdayMessage");
const celebrationLayer = document.getElementById("celebrationLayer");

let width = 0;
let height = 0;
let particles = [];
let hintTimer;
let quietHintTimer;
let birthdayAudioStarted = false;

function showPage(pageNumber) {
  pages.forEach((page) => {
  showPage(5);
});

finalSurpriseButton.addEventListener("click", () => {
  showPage(6);
});

function launchBirthdayEffects() {
  const colors = ["#ffd98f", "#ff9fbd", "#fff1d0", "#d9a7ff", "#f8b06f"];

  for (let index = 0; index < 34; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark-burst";
    spark.style.setProperty("--spark-x", `${(Math.random() - 0.5) * 760}px`);
    spark.style.setProperty("--spark-y", `${(Math.random() - 0.5) * 430}px`);
    spark.style.animationDelay = `${Math.random() * 180}ms`;
    celebrationLayer.appendChild(spark);
    spark.addEventListener("animationend", () => spark.remove());
  }

  const confettiCount = window.innerWidth < 640 ? 44 : 90;
  for (let index = 0; index < confettiCount; index += 1) {
    const confetti = document.createElement("span");
    confetti.className = "romantic-confetti";
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.setProperty("--drift", `${(Math.random() - 0.5) * 46}vw`);
    confetti.style.setProperty("--duration", `${3 + Math.random() * 2.6}s`);
    confetti.style.setProperty("--confetti-color", colors[Math.floor(Math.random() * colors.length)]);
    confetti.style.animationDelay = `${Math.random() * 520}ms`;
    celebrationLayer.appendChild(confetti);
    confetti.addEventListener("animationend", () => confetti.remove());
  }
}

function playBirthdayMelody() {
  if (birthdayAudioStarted) return;
  birthdayAudioStarted = true;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();
  const master = audioContext.createGain();
  master.gain.setValueAtTime(0.0001, audioContext.currentTime);
  master.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.8);
  master.connect(audioContext.destination);

  const notes = [
    ["G4", 0], ["G4", 0.35], ["A4", 0.7], ["G4", 1.05], ["C5", 1.4], ["B4", 1.9],
    ["G4", 2.65], ["G4", 3], ["A4", 3.35], ["G4", 3.7], ["D5", 4.05], ["C5", 4.55],
    ["G4", 5.3], ["G4", 5.65], ["G5", 6], ["E5", 6.35], ["C5", 6.7], ["B4", 7.05], ["A4", 7.4],
    ["F5", 8.1], ["F5", 8.45], ["E5", 8.8], ["C5", 9.15], ["D5", 9.5], ["C5", 10.1]
  ];
  const frequencies = {
    G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99
  };

  notes.forEach(([note, offset], index) => {
    const start = audioContext.currentTime + offset;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequencies[note];
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(index % 3 === 0 ? 0.16 : 0.11, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
    oscillator.connect(gain).connect(master);
    oscillator.start(start);
    oscillator.stop(start + 0.36);
  });
}

lightCandlesButton.addEventListener("click", () => {
  birthdayPage.classList.add("celebrating");
  birthdayMessage.setAttribute("aria-hidden", "false");
  launchBirthdayEffects();
  playBirthdayMelody();
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();

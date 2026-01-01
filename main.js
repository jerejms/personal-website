console.log("main.js loaded");

const loadFill = document.getElementById("loadFill");
const loadPct = document.getElementById("loadPct");
const loadText = document.getElementById("loadText");
const clickHint = document.getElementById("clickHint");
const enter = document.getElementById("enter");

let readyToEnter = false;

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("theme-sakura");
    themeBtn.textContent = document.body.classList.contains("theme-sakura")
      ? "DARK"
      : "SAKURA";
  });
}

function startLoadingScreen() {
  if (!enter || !loadFill || !loadPct || !loadText || !clickHint) return;

  let p = 0;
  const steps = [
    "booting…",
    "loading ui…",
    "mounting modules…",
    "syncing data…",
    "finalizing…"
  ];

let lastStep = "";

const timer = setInterval(() => {
  p += Math.floor(4 + Math.random() * 10);
  if (p > 100) p = 100;

  loadFill.style.width = p + "%";
  loadPct.textContent = p + "%";

  const step = steps[Math.min(steps.length - 1, Math.floor(p / 25))];
  loadText.textContent = step;

  if (step !== lastStep) {
    lastStep = step;
  }

  if (p === 100) {
    clearInterval(timer);
    loadText.textContent = "ready.";
    clickHint.style.display = "block";
    readyToEnter = true;
  }
}, 320);
}

startLoadingScreen();

const items = document.querySelectorAll(".menu-item");
const pages = {
  home: document.getElementById("page-home"),
  about: document.getElementById("page-about"),
  links: document.getElementById("page-links"),
  gallery: document.getElementById("page-gallery"),
  portfolio: document.getElementById("page-portfolio"),
};

items.forEach((btn) => {
  btn.addEventListener("click", () => {
    items.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    Object.values(pages).forEach((p) => p.classList.remove("active"));
    pages[btn.dataset.page].classList.add("active");

    if (btn.dataset.page === "home") runIntro();
  });
});


let introToken = 0;

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function typeText(el, text, speed = 35, token) {
  if (!el) return;
  el.textContent = "";
  for (let i = 0; i < text.length; i++) {
    if (token !== introToken) return;
    el.textContent += text[i];
    await sleep(speed);
  }
}

async function runIntro() {
  const l1 = document.getElementById("line1");
  const l2 = document.getElementById("line2");
  const l3 = document.getElementById("line3");
  if (!l1 || !l2 || !l3) return;

  introToken++;
  const token = introToken;

  l1.textContent = "";
  l2.textContent = "";
  l3.style.opacity = 0;
  l3.style.transform = "translateY(4px)";

  await typeText(l1,
    "You have arrived at my first personal website! — feel free to explore the menu on the left.",
    28,
    token
  );
  await typeText(l2,
    "This is where I spend most of my winter vacation of 2025, and I can't wait to get feedback!",
    28,
    token
  );

  if (token !== introToken) return;
  l3.style.opacity = 0.7;
  l3.style.transform = "translateY(0)";
}
 
const audio = new Audio("music.mp3");
audio.loop = true;

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const vol = document.getElementById("vol");
const muteBtn = document.getElementById("muteBtn");
const nowPlaying = document.getElementById("nowPlaying");

function setNow(text){ if (nowPlaying) nowPlaying.textContent = text; }

vol.addEventListener("input", () => {
  audio.volume = Number(vol.value);
});

playBtn.addEventListener("click", async () => {
  try {
    await audio.play();
    setNow(audio.muted ? "music: muted" : "music: on");
  } catch (e) {
    console.log(e);
    setNow("music: blocked (click to allow)");
  }
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
  setNow("music: off");
});

function spawnPetal() {
  const p = document.createElement("div");
  p.className = "petal";

  const startX = Math.random() * window.innerWidth;
  p.style.left = startX + "px";

  const dx = (Math.random() - 0.5) * 200 + "px";
  const rot = (Math.random() * 360 + 180) + "deg";
  p.style.setProperty("--dx", dx);
  p.style.setProperty("--rot", rot);

  const scale = 0.6 + Math.random() * 1.1;
  p.style.transform = `scale(${scale}) rotate(20deg)`;

  const dur = 6 + Math.random() * 6;
  p.style.animation = `fall ${dur}s linear forwards`;

  document.body.appendChild(p);
  setTimeout(() => p.remove(), dur * 1000);
}

const MAX_PETALS = 10;

setInterval(() => {
  if (document.querySelectorAll(".petal").length < MAX_PETALS) {
    spawnPetal();
  }
}, 650);


muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "UNMUTE 🔊" : "MUTE 🔇";
  setNow(audio.muted ? "music: muted" : (audio.paused ? "music: off" : "music: on"));
});

const os = document.querySelector(".os");

if (enter) {
  enter.addEventListener("click", async () => {
    if (!readyToEnter) return;

    try { await audio.play(); } catch (e) {}
    setNow(audio.muted ? "music: muted" : "music: on");

    enter.style.display = "none";
    runIntro();


    if (os) {
      os.classList.remove("boot");
      void os.offsetWidth;
      os.classList.add("boot");
    }
  });
}



const glow = document.querySelector(".cursorGlow");
window.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

function updateDateWidget(){
  const now = new Date();

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const dDay = document.getElementById("dateDay");
  const dMonth = document.getElementById("dateMonth");
  const dNum = document.getElementById("dateNum");
  const dYear = document.getElementById("dateYear");

  if (!dDay || !dMonth || !dNum || !dYear) return;

  dDay.textContent = days[now.getDay()];
  dMonth.textContent = months[now.getMonth()];
  dNum.textContent = now.getDate();
  dYear.textContent = now.getFullYear();
}

updateDateWidget();

function updateDateTimeWidget(){
  const t = document.getElementById("dtTime");
  const ap = document.getElementById("dtAmpm");
  if (!t) return;

  const now = new Date();

  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");

  const colon = now.getSeconds() % 2 === 0 ? ":" : " ";
  t.textContent = `${h}${colon}${m}`;

  if (ap) ap.textContent = "local";
}

updateDateTimeWidget();
setInterval(updateDateTimeWidget, 1000);

const motds = [
  "remember to hydrate ✦",
  "music makes everything better",
  "today’s vibe: chill",
];

const motdEl = document.getElementById("motd");
if (motdEl) {
  motdEl.textContent = motds[Math.floor(Math.random() * motds.length)];
}

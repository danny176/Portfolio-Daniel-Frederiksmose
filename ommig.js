// Vandret scroll-animation

const races = document.querySelector(".races");

// Funktion til at beregne, hvor meget der skal scrolles
function getScrollAmount() {
  let racesWidth = races.scrollWidth; // Den samlede bredde af races-containeren
  return racesWidth - window.innerWidth + 128; // Den scrollbare bredde
}

const tween = gsap.to(races, {
  x: -getScrollAmount(), // Flytter races-containeren til venstre med den scrollbare bredde
  duration: 3,
  ease: "none",
  paused: true, // Starter med at være pauset, så den kun afspilles ved scroll
});

ScrollTrigger.create({
  trigger: ".racesWrapper",
  start: "center center", // Starter når toppen af wrapperen rammer midten af viewporten
  end: () => `+=${getScrollAmount()}`, // Slutter når hele scrollområdet er passeret
  pin: true, // Låser wrapperen fast, så kun indholdet bevæger sig
  animation: tween,
  scrub: 1, // Gør animationen afhængig af scroll-bevægelsen
  invalidateOnRefresh: true, // Genberegner værdier, hvis vinduet ændres
  markers: false, // Sæt til true for debugging, fjern i produktion
});

// Farveændring af kort / Animation af pseudo-element

ScrollTrigger.create({
  trigger: ".racesWrapper",
  start: "center center", // Starter når wrapperen er i midten af viewporten
  end: () => `+=${getScrollAmount()}`, // Slutter når scrollen er fuldført
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress; // Henter normaliseret scroll-progress (0 til 1)
    const cards = document.querySelectorAll(".card");
    const totalCards = cards.length; // Antallet af kort

    cards.forEach((card, index) => {
      const cardStart = index / totalCards; // Startpunkt for dette korts overgang
      const cardEnd = (index + 1) / totalCards; // Slutpunkt for dette korts overgang

      // Det første kort skal være helt blåt fra starten
      if (index === 0) {
        card.style.setProperty("--pseudo-transform", "100%");
      } else if (progress >= cardStart && progress <= cardEnd) {
        // Normaliser progress for dette kort
        const localProgress = (progress - cardStart) / (cardEnd - cardStart);
        card.style.setProperty("--pseudo-transform", `${localProgress * 100}%`);
      } else if (progress > cardEnd) {
        // Hvis scrollen er forbi dette kort, gør pseudo-elementet helt blåt
        card.style.setProperty("--pseudo-transform", "100%");
      } else if (progress < cardStart) {
        // Hvis scrollen ikke er nået til dette kort endnu, nulstil pseudo-elementet
        card.style.setProperty("--pseudo-transform", "0%");
      }
    });
  },
});

// Musikknap afspiller

const button = document.querySelector(".musikknap");
const fraText = document.querySelector(".fra");
const tilText = document.querySelector(".til");

// GSAP-tidslinje for tekstskift animation
const tl = gsap.timeline({ paused: true });

tl.to(fraText, { y: "-100%", duration: 0.4, ease: "power2.inOut" }, 0) // Flytter FRA-teksten op
  .to(tilText, { y: "0", duration: 0.4, ease: "power2.inOut" }, 0); // Flytter TIL-teksten til samme position som FRA

// Lydfiler
const tracks = [
  document.getElementById("audio1"),
  document.getElementById("audio2"),
  document.getElementById("audio3"),
];

let currentTrack = null;
let lastTrackIndex = -1; // Holder styr på sidste afspillede track
let isPlaying = false;

// Funktion til at vælge et tilfældigt track, der ikke er det samme som det sidste
function getRandomTrack() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * tracks.length);
  } while (randomIndex === lastTrackIndex); // Sørger for at vælge et nyt track
  lastTrackIndex = randomIndex; // Opdaterer sidste afspillede track
  return tracks[randomIndex];
}

// Klik-event til at afspille/stoppe musik og animere knappen
button.addEventListener("click", () => {
  if (isPlaying) {
    currentTrack.pause();
    currentTrack.currentTime = 0;
    isPlaying = false;
    tl.reverse(); // Reverserer animationen
  } else {
    currentTrack = getRandomTrack(); // Vælger et nyt, tilfældigt track
    currentTrack.loop = true;
    currentTrack.play();
    isPlaying = true;
    tl.play(); // Starter animationen
  }
});

// Billed-spor effekt på "Hvem er jeg?"-sektionen

const container = document.querySelector(".it-container");
const itemsContainer = document.querySelector(".items");
const images = ["/images/it1.png", "/images/it2.png", "/images/it3.png"]; // Stier til billeder

let trailImages = [];
let fadeOutTimeout;

// Opretter billed-elementer
images.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("image-trail");
  itemsContainer.appendChild(img);
  trailImages.push(img);
});

// Viser billedcontaineren når musen bevæger sig ind
container.addEventListener("mouseenter", () => {
  itemsContainer.style.display = "block";
});

// Sætter initiale GSAP-egenskaber
gsap.set(trailImages, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 });

container.addEventListener("mousemove", (e) => {
  // Nulstil en eventuel eksisterende fade-out timer
  clearTimeout(fadeOutTimeout);

  const mouseX = e.pageX;
  const mouseY = e.pageY;

  gsap.to(trailImages, {
    x: mouseX,
    y: mouseY,
    opacity: 1,
    scale: 1,
    duration: 0.3,
    stagger: 0.1,
  });

  // Indstiller en forsinket fade-out effekt, når musen stopper med at bevæge sig
  fadeOutTimeout = setTimeout(() => {
    gsap.to(trailImages, {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
    });
  }, 200); // Juster denne forsinkelse (200ms) for en glattere effekt
});

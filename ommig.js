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

//Animationer

const splitTextOmmig = new SplitType("#overskrift1", {
  types: "words, chars",
  wordClass: "zero1-word", // Hvert ord får en <span class="welcome-word">
  charClass: "zero1-char", // Hver karakter får en <span class="welcome-char">
});

gsap.fromTo(
  ".zero1-char",
  {
    y: 500,
    x: -50,
    opacity: 1,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.01, // Tilføj en forsinkelse mellem hver karakter's animation
  }
);

const splitTextOmmig2 = new SplitType("#overskrift2", {
  types: "words, chars",
  wordClass: "zero2-word", // Hvert ord får en <span class="welcome-word">
  charClass: "zero2-char", // Hver karakter får en <span class="welcome-char">
});

gsap.fromTo(
  ".zero2-char",
  {
    y: 500,
    x: -50,
    opacity: 1,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.01, // Tilføj en forsinkelse mellem hver karakter's animation
  }
);

//Billede reveal animation med imagewrapper som trigger

gsap.utils.toArray(".imagewrapper").forEach((imageWrapper) => {
  gsap.utils.toArray(imageWrapper.querySelectorAll("img")).forEach((img) => {
    gsap.from(img, {
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
      ease: "Expo.easeOut",
      scrollTrigger: {
        trigger: img, // Triggers animation per image
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
});

gsap.fromTo(
  ".tekst-intro",
  {
    y: 100,
    x: 0,
    opacity: 0,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: "Expo.easeOut",
    stagger: 0.02, // Tilføj en forsinkelse mellem hver karakter's animation
  }
);

const splitTextHvem = new SplitType(".it-container", {
  types: "words, chars",
  wordClass: "hvem1-word", // Hvert ord får en <span class="welcome-word">
  charClass: "hvem1-char", // Hver karakter får en <span class="welcome-char">
});

gsap.fromTo(
  ".hvem1-char",
  {
    y: 300,
    x: -50,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "Expo.easeOut",
    stagger: 0.02, // Tilføjer en forsinkelse mellem hver karakter animation
    scrollTrigger: {
      trigger: ".hvemerjeg", // The element that triggers the animation
      start: "top 80%", // Starts when the top of the element reaches 80% of viewport
      toggleActions: "play none none none", // Runs once
      markers: false,
    },
  }
);

gsap.fromTo(
  ".kreativ",
  {
    y: 100,
    x: 0,
    opacity: 0,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "Expo.easeOut",
    stagger: 0.02, // Tilføj en forsinkelse mellem hver karakter's animation
    scrollTrigger: {
      trigger: ".kreativ", // The element that triggers the animation
      start: "top 90%", // Starts when the top of the element reaches 80% of viewport
      toggleActions: "play none none none", // Runs once
      markers: false,
    },
  }
);

const skillsCheck = new SplitType(".headline-kom h2", {
  types: "chars",
  charClass: "skills-char",
});

gsap.fromTo(
  ".skills-char",
  {
    y: 300,
    x: 0,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "Expo.easeOut",
    stagger: 0.01, // Tilføjer en forsinkelse mellem hver karakter animation
    scrollTrigger: {
      trigger: ".headline-kom", // Elementet der udløser animationen
      start: "bottom bottom", // Når toppen af elementet når 75% af viewporten
      end: "center center", // Når toppen af elementet når 25% af viewporten
      toggleActions: "play none none none", // Afspil ved enter, ingen reset
      markers: false,
    },
  }
);

const splitTextSocials = new SplitType(".social-text", {
  types: "words, chars",
  wordClass: "social-word", // Hvert ord får en <span class="welcome-word">
  charClass: "social-char", // Hver karakter får en <span class="welcome-char">
});

gsap.fromTo(
  ".social-char",
  {
    y: 400,
  },

  {
    y: 0,
    ease: "power2.out",
    duration: 0.5,
    stagger: 0.01,
    scrollTrigger: {
      trigger: ".social-text", // Trigger animation baseret på nav containeren
      start: "top 80%", // Animationen starter når toppen af nav er nået til toppen af viewporten
      end: "bottom top", // Animationen stopper når bunden af nav er nået til toppen af viewporten
      markers: true, // Valgfrit: for at se start og slutmarkeringer
      toggleActions: "play none none none", // Spil når man kommer ind, ingen reset
    },
  }
);

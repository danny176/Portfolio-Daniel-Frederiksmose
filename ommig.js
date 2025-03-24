// Function to initialize horizontal scroll animation
function initializeHorizontalScroll() {
  const races = document.querySelector(".races");

  // Function to calculate the scroll amount
  function getScrollAmount() {
    let racesWidth = races.scrollWidth;
    return racesWidth - window.innerWidth + 128;
  }

  // Create the GSAP tween for horizontal scroll
  const tween = gsap.to(races, {
    x: -getScrollAmount(),
    duration: 3,
    ease: "none",
    paused: true,
  });

  // Create the ScrollTrigger instance for horizontal scroll
  ScrollTrigger.create({
    trigger: ".racesWrapper",
    start: "center center",
    end: () => `+=${getScrollAmount()}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    markers: false,
  });

  // Color change animation for cards
  ScrollTrigger.create({
    trigger: ".racesWrapper",
    start: "center center",
    end: () => `+=${getScrollAmount()}`,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const cards = document.querySelectorAll(".card");
      const totalCards = cards.length;

      cards.forEach((card, index) => {
        const cardStart = index / totalCards;
        const cardEnd = (index + 1) / totalCards;

        if (index === 0) {
          card.style.setProperty("--pseudo-transform", "100%");
        } else if (progress >= cardStart && progress <= cardEnd) {
          const localProgress = (progress - cardStart) / (cardEnd - cardStart);
          card.style.setProperty(
            "--pseudo-transform",
            `${localProgress * 100}%`
          );
        } else if (progress > cardEnd) {
          card.style.setProperty("--pseudo-transform", "100%");
        } else if (progress < cardStart) {
          card.style.setProperty("--pseudo-transform", "0%");
        }
      });
    },
  });
}

// Function to disable horizontal scroll animation
function disableHorizontalScroll() {
  const races = document.querySelector(".races");
  gsap.set(races, { x: 0 }); // Reset horizontal translation
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.setProperty("--pseudo-transform", "0%"); // Reset pseudo-element transform
  });
}

// Check viewport width and enable/disable horizontal scroll
function checkViewportWidth() {
  if (window.innerWidth >= 600) {
    initializeHorizontalScroll(); // Enable horizontal scroll if viewport is 600px or wider
  } else {
    disableHorizontalScroll(); // Disable horizontal scroll if viewport is under 600px
  }
}

// Initialize horizontal scroll on page load
checkViewportWidth();

// Re-check viewport width on window resize
window.addEventListener("resize", checkViewportWidth);

// ====================================================
// All other GSAP and JavaScript code remains outside
// ====================================================

// Musikknap afspiller
const button = document.querySelector(".musikknap");
const fraText = document.querySelector(".fra");
const tilText = document.querySelector(".til");

// GSAP-tidslinje for tekstskift animation
const tl = gsap.timeline({ paused: true });

tl.to(fraText, { y: "-100%", duration: 0.4, ease: "power2.inOut" }, 0).to(
  tilText,
  { y: "0", duration: 0.4, ease: "power2.inOut" },
  0
);

// Lydfiler
const tracks = [
  document.getElementById("audio1"),
  document.getElementById("audio2"),
  document.getElementById("audio3"),
];

let currentTrack = null;
let lastTrackIndex = -1;
let isPlaying = false;

function getRandomTrack() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * tracks.length);
  } while (randomIndex === lastTrackIndex);
  lastTrackIndex = randomIndex;
  return tracks[randomIndex];
}

function playNextTrack() {
  if (isPlaying) {
    currentTrack = getRandomTrack();
    currentTrack.play();
    currentTrack.addEventListener("ended", playNextTrack); // Play next when finished
  }
}

button.addEventListener("click", () => {
  if (isPlaying) {
    currentTrack.pause();
    currentTrack.currentTime = 0;
    isPlaying = false;
    tl.reverse();
  } else {
    currentTrack = getRandomTrack();
    currentTrack.play();
    isPlaying = true;
    tl.play();
  }
});

// Billed-spor effekt på "Hvem er jeg?"-sektionen
const container = document.querySelector(".it-container");
const itemsContainer = document.querySelector(".items");
const images = ["/images/it1.png", "/images/it2.png", "/images/it3.png"];

let trailImages = [];
let fadeOutTimeout;

images.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("image-trail");
  itemsContainer.appendChild(img);
  trailImages.push(img);
});

container.addEventListener("mouseenter", () => {
  itemsContainer.style.display = "block";
});

gsap.set(trailImages, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 });

container.addEventListener("mousemove", (e) => {
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

  fadeOutTimeout = setTimeout(() => {
    gsap.to(trailImages, {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
    });
  }, 200);
});

// Animationer
const splitTextOmmig = new SplitType("#overskrift1", {
  types: "words, chars",
  wordClass: "zero1-word",
  charClass: "zero1-char",
});

gsap.fromTo(
  ".zero1-char",
  { y: 500, x: -50, opacity: 1 },
  { y: 0, x: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.01 }
);

const splitTextOmmig2 = new SplitType("#overskrift2", {
  types: "words, chars",
  wordClass: "zero2-word",
  charClass: "zero2-char",
});

gsap.fromTo(
  ".zero2-char",
  { y: 500, x: -50, opacity: 1 },
  { y: 0, x: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.01 }
);

// Billede reveal animation
gsap.utils.toArray(".imagewrapper").forEach((imageWrapper) => {
  gsap.utils.toArray(imageWrapper.querySelectorAll("img")).forEach((img) => {
    gsap.from(img, {
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
      ease: "Expo.easeOut",
      scrollTrigger: {
        trigger: img,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
});

gsap.fromTo(
  ".tekst-intro",
  { y: 100, x: 0, opacity: 0 },
  { y: 0, x: 0, opacity: 1, duration: 0.6, ease: "Expo.easeOut", stagger: 0.02 }
);

const splitTextHvem = new SplitType(".it-container", {
  types: "words, chars",
  wordClass: "hvem1-word",
  charClass: "hvem1-char",
});

gsap.fromTo(
  ".hvem1-char",
  { y: 300, x: -50 },
  { y: 0, x: 0, opacity: 1, duration: 1, ease: "Expo.easeOut", stagger: 0.02 }
);

gsap.fromTo(
  ".kreativ",
  { y: 100, x: 0, opacity: 0 },
  { y: 0, x: 0, opacity: 1, duration: 1, ease: "Expo.easeOut", stagger: 0.02 }
);

const skillsCheck = new SplitType(".headline-kom h2", {
  types: "chars",
  charClass: "skills-char",
});

gsap.fromTo(
  ".skills-char",
  { y: 300, x: 0 },
  { y: 0, x: 0, opacity: 1, duration: 1, ease: "Expo.easeOut", stagger: 0.01 }
);

const splitTextSocials = new SplitType(".social-text", {
  types: "words, chars",
  wordClass: "social-word",
  charClass: "social-char",
});

gsap.fromTo(
  ".social-char",
  { y: 400 },
  { y: 0, ease: "power2.out", duration: 0.5, stagger: 0.01 }
);

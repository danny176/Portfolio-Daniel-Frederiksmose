//Hori scroll

const races = document.querySelector(".races");

function getScrollAmount() {
  let racesWidth = races.scrollWidth; // Total width of the races container
  return racesWidth - window.innerWidth + 128; // Scrollable width
}

const tween = gsap.to(races, {
  x: -getScrollAmount(), // Move left by the scrollable width
  duration: 3,
  ease: "none",
  paused: true, // Start paused, to control when it plays
});

ScrollTrigger.create({
  trigger: ".racesWrapper",
  start: "center center", // Start when the top of the wrapper hits the top of the viewport
  end: () => `+=${getScrollAmount()}`, // End when the scrollable width is reached
  pin: true, // Pin the wrapper in place
  animation: tween,
  scrub: 1,
  invalidateOnRefresh: true,
  markers: false, // Set to true for debugging, remove in production
});

//Color change cards / Animate pseodu element

ScrollTrigger.create({
  trigger: ".racesWrapper",
  start: "center center", // Start when the wrapper hits the center of the viewport
  end: () => `+=${getScrollAmount()}`, // End when the scrollable width is reached
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress; // Get normalized scroll progress (0 to 1)
    const cards = document.querySelectorAll(".card");
    const totalCards = cards.length; // Total number of cards

    cards.forEach((card, index) => {
      const cardStart = index / totalCards; // The point at which this card's transition begins
      const cardEnd = (index + 1) / totalCards; // The point at which this card's transition ends

      // If it's the first card, it should already be fully blue
      if (index === 0) {
        card.style.setProperty("--pseudo-transform", "100%");
      } else if (progress >= cardStart && progress <= cardEnd) {
        // Normalize the progress for this card
        const localProgress = (progress - cardStart) / (cardEnd - cardStart); // Normalize scroll progress for this card
        card.style.setProperty("--pseudo-transform", `${localProgress * 100}%`);
      } else if (progress > cardEnd) {
        // If the scroll has passed the end of this card, make the pseudo-element fully blue
        card.style.setProperty("--pseudo-transform", "100%");
      } else if (progress < cardStart) {
        // If the scroll hasn't reached this card, reset the pseudo-element to 0%
        card.style.setProperty("--pseudo-transform", "0%");
      }
    });
  },
});

// Musik knap afspiller
const button = document.querySelector(".musikknap");
const fraText = document.querySelector(".fra");
const tilText = document.querySelector(".til");

// GSAP timeline for text swap animation
const tl = gsap.timeline({ paused: true });

tl.to(fraText, { y: "-100%", duration: 0.4, ease: "power2.inOut" }, 0) // Move FRA up
  .to(tilText, { y: "0", duration: 0.4, ease: "power2.inOut" }, 0); // Move TIL to the same place as FRA

// Audio logic
const tracks = [
  document.getElementById("audio1"),
  document.getElementById("audio2"),
  document.getElementById("audio3"),
];

let currentTrack = null;
let lastTrackIndex = -1; // Variable to keep track of the last played track
let isPlaying = false;

// Function to pick a random track that is not the same as the last one
function getRandomTrack() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * tracks.length);
  } while (randomIndex === lastTrackIndex); // Keep picking a new one if it's the same as the last track
  lastTrackIndex = randomIndex; // Update lastTrackIndex to the new one
  return tracks[randomIndex];
}

// Click event to toggle music and animation
button.addEventListener("click", () => {
  if (isPlaying) {
    currentTrack.pause();
    currentTrack.currentTime = 0;
    isPlaying = false;
    tl.reverse(); // Reverse animation
  } else {
    currentTrack = getRandomTrack(); // Get a random track that is not the same as the last
    currentTrack.loop = true;
    currentTrack.play();
    isPlaying = true;
    tl.play(); // Play animation
  }
});

//Image trail effekt på min hvem er jeg tekst

// Assuming GSAP is already linked
const container = document.querySelector('.it-container');
const itemsContainer = document.querySelector('.items');
const images = ['/images/it1.png', '/images/it2.png', '/images/it3.png']; // Image paths

let trailImages = [];
let fadeOutTimeout;

// Create image elements
images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('image-trail');
    itemsContainer.appendChild(img);
    trailImages.push(img);
});

container.addEventListener('mouseenter', () => {
  itemsContainer.style.display = 'block';
});

// Set initial GSAP properties
gsap.set(trailImages, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 });

container.addEventListener('mousemove', (e) => {
    // Clear any existing fade-out timer
    clearTimeout(fadeOutTimeout);

    const mouseX = e.pageX;
    const mouseY = e.pageY;

    gsap.to(trailImages, {
        x: mouseX,
        y: mouseY,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1
    });

    // Set a delayed fade-out after user slows down or stops moving
    fadeOutTimeout = setTimeout(() => {
        gsap.to(trailImages, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3
        });
    
      }, 200); // Adjust this delay (200ms) for smoother effect
});


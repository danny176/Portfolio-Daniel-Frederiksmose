//Smooth scroll

const lenis = new Lenis({
  duration: 1, // Smooth scroll duration
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP setup for the custom cursor
gsap.set("#cursor-image", { xPercent: -75, yPercent: -25 }); // Center the cursor image

// Create quickTo functions for GSAP
let xToCursorImage = gsap.quickTo("#cursor-image", "x", {
  duration: 0.6,
  ease: "power3",
});
let yToCursorImage = gsap.quickTo("#cursor-image", "y", {
  duration: 0.6,
  ease: "power3",
});

// Select video elements
const video1 = document.querySelectorAll(
  "#workCase1, #workCase2, #workCase3, #workCase4"
);

// Mouse move event for the entire document
$(document).mousemove((e) => {
  xToCursorImage(e.pageX - 32); // Adjust based on cursor image width
  yToCursorImage(e.pageY - 27); // Adjust based on cursor image height
});

// Handle mouse enter events on video elements
video1.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    // Show and scale the cursor image
    gsap.set("#cursor-image", { display: "block", scale: 0 }); // Set initial scale to 0
    gsap.to("#cursor-image", {
      scale: 1,
      duration: 0.3,
      ease: "cubic-bezier(0.18, 0.46, 0.34, 0.87)",
    });

    circleAnimation.play();
    cursorTimeline.restart();
  });

  // Handle mouse leave events on video elements
  video.addEventListener("mouseleave", () => {
    // Animate the cursor image back to small size
    gsap.to("#cursor-image", {
      scale: 0,
      duration: 0.3,
      ease: "cubic-bezier(0.18, 0.46, 0.34, 0.87)",
    });

    circleAnimation.restart();
  });
});

//Animation stagger link effect

const staggerLinks = document.querySelectorAll(".stagger-link");

staggerLinks.forEach((link) => {
  const textElement = link.querySelector(".stagger-link-text");

  // Split the text into characters
  const splitText = new SplitType(textElement, { types: "chars" });

  // Create a GSAP timeline for the animation
  const tl = gsap.timeline({ paused: true });

  // Staggered animation for each character
  tl.to(splitText.chars, {
    y: "-120%", // Move each letter down
    duration: 0.4,
    ease: "power2.inOut",
    overwrite: true,
  });

  // Mouse enter event to play the animation
  link.addEventListener("mouseenter", () => {
    tl.play();
  });

  // Mouse leave event to reverse the animation
  link.addEventListener("mouseleave", () => {
    tl.reverse();
  });
});

//Flyt nav op med scrool
gsap.to(".nav-container", {
  y: -100, // Move upwards by 100px (adjust as needed)
  ease: "power2.in",
  scrollTrigger: {
    trigger: ".nav-container", // Trigger animation based on the nav container
    start: "top top", // Animation starts when the top of the nav hits the top of the viewport
    end: "bottom top", // Animation ends when the bottom of the nav hits the top of the viewport
    scrub: true, // Smoothly link animation to scroll
    markers: false, // Optional: to see the start and end markers
  },
});

const splitTextSocials = new SplitType(".social-text", {
  types: "words, chars",
  wordClass: "social-word", // Each word gets wrapped in a <span class="welcome-word">
  charClass: "social-char", // Each character gets wrapped in a <span class="welcome-char">
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
      trigger: ".footer-sec", // Trigger animation based on the nav container
      start: "top 80%", // Animation starts when the top of the nav hits the top of the viewport
      end: "bottom top", // Animation ends when the bottom of the nav hits the top of the viewport
      markers: false, // Optional: to see the start and end markers
      toggleActions: "play none none none", // Play on enter, don't reset
    },
  }
);

//Pin experi

gsap.utils.toArray(".work-flex").forEach((section, index, sections) => {
  const titleNr = section.querySelector(".title-nr");
  const lastSection = sections[sections.length - 1]; // Select the last section

  // Create ScrollTrigger for pinning each element
  ScrollTrigger.create({
    trigger: titleNr,
    start: "top center", // Pin when the top of title-nr hits the center of the viewport
    end: "bottom center", // End pinning at the bottom of the section
    pin: true, // Pin the title-nr
    pinSpacing: false, // Prevent additional spacing after pinning
    markers: false,

    // Reset position for the last element when it's unpinned
    onLeave: () => {
      if (section === lastSection) {
        // Animate the last pinned element back to its original position
        gsap.to(titleNr, {
          y: 0, // Return to its original position
          duration: 0.4, // Smooth animation
          ease: "power2.in", // Easing for smooth transition
          clearProps: "all", // Clear all GSAP properties after animation
        });
      }
    },
  });
});

// Animer bogstaverne ved scroll
gsap.fromTo(
  ".work-header h2",
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
    stagger: 0.01, // Adds a delay between each character's animation
    scrollTrigger: {
      trigger: ".work-header", // The element that triggers the animation
      start: "bottom bottom", // When the top of the element reaches 75% of the viewport
      end: "bottom bottom", // When the top of the element reaches 25% of the viewport
      toggleActions: "play none none none", // Play on enter, don't reset
      markers: false,
    },
  }
);

// Create the spinning animation
gsap.to("#heroLogo", {
  scrollTrigger: {
    trigger: ".heroLogoContainer", // The container element for the logo
    start: "top 10%", // Start when the top of the container enters the viewport
    end: "bottom top", // End when the bottom leaves the viewport
    scrub: 3, // Smooth scrubbing effect
    markers: false,
  },
  rotation: 360, // Spin the logo 360 degrees
  ease: "none", // Keep the animation linear
});

//Billede hover function

gsap.set(".flair", { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(".flair", "x", { duration: 0.6, ease: "power3" }),
  yTo = gsap.quickTo(".flair", "y", { duration: 0.6, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});

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

// Animer bogstaverne ved scroll

const splitTextWelcome = new SplitType(".welcome-text", {
  types: "words, chars",
  wordClass: "welcome-word", // Each word gets wrapped in a <span class="welcome-word">
  charClass: "welcome-char", // Each character gets wrapped in a <span class="welcome-char">
});

const splitTextDesigner = new SplitType(".designertekst", {
  types: "words, chars",
  wordClass: "designer-word", // Each word gets wrapped in a <span class="welcome-word">
  charClass: "designer-char", // Each character gets wrapped in a <span class="welcome-char">
});

// Ensure no word-breaking within `.welcome-word`
document.querySelectorAll(".welcome-word").forEach((word) => {
  word.style.whiteSpace = "nowrap"; // Prevent word breaks for each word
});

//Landing page animation intro

const introLogo = document.getElementById("introLogo");
const introAnimation = document.getElementById("introAnimation");

// GSAP Timeline
const introAnimationTimeline = gsap.timeline({
  onStart: () => {
    // Lock scrolling at the start of the intro animation
    document.body.style.overflow = "hidden";
  },

  onComplete: () => {
    // Skjule alle intro elementer efter complete
    document.body.classList.add("intro-complete");

    //Animer min herosection elementer ind my opacity
    gsap.to(".herosection", {
      opacity: 1, // Set the opacity to 1
      duration: 0.5, // Smooth fade-in
      ease: "power2.out",
    });

    gsap.fromTo(
      ".nav-container",
      {
        y: -100,
        opacity: 0,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.Out", // Glat easing
      }
    );

    //Animere min headlines
    gsap.fromTo(
      ".word h2, .word2 h2, #heroLogo",
      {
        y: 300,
        x: 20,
      },
      {
        y: 0,
        x: 0, // Slutposition (oprindelig placering)
        duration: 0.6,
        ease: "power1.inOut", // Glat easing
      }
    );

    //Animere min velkommen tekst
    gsap.fromTo(
      ".welcome-char",
      {
        y: 110,
        x: 0,
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.003, // Adds a delay between each character's animation
      }
    );

    //Animere min designer tekst
    gsap.fromTo(
      ".designer-char, .pilforside",
      {
        y: 400,
        x: 0,
        opacity: 1,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.02, // Adds a delay between each character's animation
      }
    );
  },
});

// Logo animation from the left
introAnimationTimeline.fromTo(
  "#introB",
  { x: "-100vw", opacity: 1 },
  { x: "0", opacity: 1, duration: 2, ease: "Expo.easeOut" }
);

introAnimationTimeline.fromTo(
  "#introA",
  { x: "100vw", opacity: 1 },
  { x: "0", opacity: 1, duration: 2, ease: "Expo.easeOut" },
  "-=2"
);

// Slide the blue background up
introAnimationTimeline.to(
  introAnimation,
  { y: "-100%", duration: 1.5, ease: "power4.inOut" },
  "+=0.5"
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
    stagger: 0.01, // Adds a delay between each character's animation
    scrollTrigger: {
      trigger: ".headline-kom", // The element that triggers the animation
      start: "bottom bottom", // When the top of the element reaches 75% of the viewport
      end: "center center", // When the top of the element reaches 25% of the viewport
      toggleActions: "play none none none", // Play on enter, don't reset
      markers: false,
    },
  }
);

// Split text into spans for text effect
function splitTextIntoSpans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const text = element.innerText;
    element.innerHTML = "";

    text.split("").forEach((char) => {
      if (char === " ") {
        element.innerHTML += " ";
      } else {
        const span = document.createElement("span");
        span.innerText = char;

        const div = document.createElement("div");
        div.className = "splittexteffect";
        div.appendChild(span);

        element.appendChild(div);
      }
    });
  });
}

splitTextIntoSpans(".splittexteffect");

// Animate text spans
document.querySelectorAll(".splittexteffect").forEach((h1) => {
  const spans = h1.querySelectorAll(".splittexteffect span");

  gsap.fromTo(
    spans,
    { x: -100 }, // Starting position
    {
      x: 0, // Ending position
      duration: 0.7,
      ease: "power1.out",
      delay: (index) => Math.random() * 0.2 + 0.1,
      scrollTrigger: {
        trigger: ".splittexteffect", // The element that triggers the animation
        start: "bottom bottom", // When the top of the element reaches 75% of the viewport
        end: "center center", // When the top of the element reaches 25% of the viewport
        toggleActions: "play none none none", // Play on enter, don't reset
        markers: false,
      },
    }
  );
});

//Animate number and arrow
gsap.fromTo(
  ".numb-arrow svg",
  {
    y: 0,
    x: 400,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "Expo.easeOut",
    scrollTrigger: {
      trigger: ".numb-arrow", // The element that triggers the animation
      start: "bottom bottom", // When the top of the element reaches 75% of the viewport
      end: "center center", // When the top of the element reaches 25% of the viewport
      toggleActions: "play none none none", // Play on enter, don't reset
      markers: false,
    },
  }
);

gsap.fromTo(
  ".title-under h2, .nummer-projekt",
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
    scrollTrigger: {
      trigger: ".numb-arrow", // The element that triggers the animation
      start: "bottom bottom", // When the top of the element reaches 75% of the viewport
      end: "center center", // When the top of the element reaches 25% of the viewport
      toggleActions: "play none none none", // Play on enter, don't reset
      markers: false,
    },
  }
);

// Store a reference to the animation
let circleAnimation = gsap.to("#circleToAnimate", {
  rotation: 360, // Spin the logo 360 degrees
  ease: "none",
  repeat: -1,
  duration: 10,
  transformOrigin: "50% 50%",
  paused: true, // Initially paused
});

gsap.set("#arrowToAnimate", {
  opacity: 0,
  rotation: 45,
  x: 25,
  transformOrigin: "50% 50%",
  stroke: "#472425",
  strokeWidth: 5,
  fill: "none",
  strokeDasharray: 300,
  strokeDashoffset: 300,
});

// Create a GSAP timeline (paused initially)
let cursorTimeline = gsap.timeline({ paused: true });

// Define the animation sequence
cursorTimeline
  .fromTo(
    "#tekstCirkel",
    { x: 100, opacity: 0 }, // Start position (shifted right)
    { x: 0, opacity: 1, duration: 0.6, ease: "power1.out" } // Move into place
  )
  // Pil animation
  .to("#arrowToAnimate", { x: 0, duration: 0.8, ease: "power2.out" }, "-=0.2")
  .to("#arrowToAnimate", { opacity: 1, duration: 0.1 }, "-=1") // Make arrow visible before animation
  .to(
    "#arrowToAnimate",
    {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.6"
  )
  .to("#arrowToAnimate", { fill: "#472425", duration: 0.5 }, "-=0.5") // Fill the arrow while drawing
  .to("#arrowToAnimate", { rotation: 0, duration: 1, ease: "Expo.easeOut" });

//Magnetisk knap på min forside kode

const button = document.querySelector(".knap-container-magnetisk");

if (button) {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      duration: 0.3,
      x: x * 1,
      y: y * 1,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", (e) => {
    gsap.to(button, {
      duration: 0.8,
      x: 0,
      y: 0,
      ease: "elastic.out(2, 0.4)",
    });
  });
}

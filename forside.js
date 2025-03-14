function runScript() {
  if (window.matchMedia("(max-width: 700px)").matches) {
      console.log("JavaScript disabled for small screens");
      return; // Stop script execution
  }

  // Your entire JavaScript code goes here
  console.log("JavaScript is running");
  //Smooth scroll

const lenis = new Lenis({
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Svg animation på hover ved projekt billeder
gsap.set("#cursor-image", { xPercent: -75, yPercent: -25 });

let xToCursorImage = gsap.quickTo("#cursor-image", "x", {
  duration: 0.6,
  ease: "power3",
});
let yToCursorImage = gsap.quickTo("#cursor-image", "y", {
  duration: 0.6,
  ease: "power3",
});

// Vælg billede elemneter
const video1 = document.querySelectorAll(
  "#workCase1, #workCase2, #workCase3, #workCase4"
);

// Følg musen
$(document).mousemove((e) => {
  xToCursorImage(e.pageX - 32);
  yToCursorImage(e.pageY - 27);
});

// Event listener for mine billede containers
video1.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    gsap.set("#cursor-image", { display: "block", scale: 0 });
    gsap.to("#cursor-image", {
      scale: 1,
      duration: 0.3,
      ease: "cubic-bezier(0.18, 0.46, 0.34, 0.87)",
    });

    circleAnimation.play();
    cursorTimeline.restart();
  });

  video.addEventListener("mouseleave", () => {
    gsap.to("#cursor-image", {
      scale: 0,
      duration: 0.3,
      ease: "cubic-bezier(0.18, 0.46, 0.34, 0.87)",
    });

    circleAnimation.restart();
  });
});

// Rullende navigations links

const staggerLinks = document.querySelectorAll(".stagger-link");

staggerLinks.forEach((link) => {
  const textElement = link.querySelector(".stagger-link-text");

  // Brug splittype til at putte spans omkring bogstaver
  const splitText = new SplitType(textElement, { types: "chars" });

  const tl = gsap.timeline({ paused: true });

  tl.to(splitText.chars, {
    y: "-120%",
    duration: 0.4,
    ease: "power2.inOut",
    overwrite: true,
  });

  link.addEventListener("mouseenter", () => {
    tl.play();
  });

  link.addEventListener("mouseleave", () => {
    tl.reverse();
  });
});

// Flyt nav op med scroll
gsap.to(".nav-container", {
  y: -100,
  ease: "power2.in",
  scrollTrigger: {
    trigger: ".nav-container",
    start: "top top",
    end: "bottom top",
    scrub: true,
    markers: false,
  },
});

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
      trigger: ".footer-sec", // Trigger animation baseret på nav containeren
      start: "top 80%", // Animationen starter når toppen af nav er nået til toppen af viewporten
      end: "bottom top", // Animationen stopper når bunden af nav er nået til toppen af viewporten
      markers: false, // Valgfrit: for at se start og slutmarkeringer
      toggleActions: "play none none none", // Spil når man kommer ind, ingen reset
    },
  }
);

// Pin eksperi

gsap.utils.toArray(".work-flex").forEach((section, index, sections) => {
  const titleNr = section.querySelector(".title-nr");
  const lastSection = sections[sections.length - 1]; // Vælg den sidste sektion

  // Opret ScrollTrigger for at pinne hvert element
  ScrollTrigger.create({
    trigger: titleNr,
    start: "top center", // Pin når toppen af title-nr når midten af viewporten
    end: "bottom center", // Stop pinning ved bunden af sektionen
    pin: true, // Pin title-nr
    pinSpacing: false, // Forhindr ekstra spacing efter pinning
    markers: false,

    // Reset position for det sidste element når det bliver unpinned
    onLeave: () => {
      if (section === lastSection) {
        // Animer det sidste pinned element tilbage til sin oprindelige position
        gsap.to(titleNr, {
          y: 0, // Vend tilbage til oprindelig position
          duration: 0.4, // Glat animation
          ease: "power2.in", // Easing for glidende overgang
          clearProps: "all", // Fjern alle GSAP properties efter animation
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
    stagger: 0.01, // Tilføj en forsinkelse mellem hver karakter's animation
    scrollTrigger: {
      trigger: ".work-header", // Elementet der trigger animationen
      start: "bottom bottom", // Når toppen af elementet når 75% af viewporten
      end: "bottom bottom", // Når toppen af elementet når 25% af viewporten
      toggleActions: "play none none none", // Spil ved indgang, ingen reset
      markers: false,
    },
  }
);

// Opret den roterende animation
gsap.to("#heroLogo", {
  scrollTrigger: {
    trigger: ".heroLogoContainer", // Container elementet for logoet
    start: "top 10%", // Start når toppen af containeren kommer ind i viewporten
    end: "bottom top", // Slut når bunden forsvinder ud af viewporten
    scrub: 3, // Glat scrubbing effekt
    markers: false,
  },
  rotation: 360, // Spin logoet 360 grader
  ease: "none", // Hold animationen lineær
});

// Billede hover funktion

gsap.set(".flair", { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(".flair", "x", { duration: 0.6, ease: "power3" }),
  yTo = gsap.quickTo(".flair", "y", { duration: 0.6, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});

// Hori scroll

const races = document.querySelector(".races");

function getScrollAmount() {
  let racesWidth = races.scrollWidth; // Total bredde af races containeren
  return racesWidth - window.innerWidth + 128; // Scrollbar bredde
}

const tween = gsap.to(races, {
  x: -getScrollAmount(), // Flyt til venstre med scrollbar bredde
  duration: 3,
  ease: "none",
  paused: true, // Startet pausede, for at kontrollere når det spilles
});

ScrollTrigger.create({
  trigger: ".racesWrapper",
  start: "center center", // Start når toppen af wrapperen rammer toppen af viewporten
  end: () => `+=${getScrollAmount()}`, // Slut når scrollable bredde er nået
  pin: true, // Pin wrapperen på plads
  animation: tween,
  scrub: 1,
  invalidateOnRefresh: true,
  markers: false, // Sæt til true for debugging, fjern i produktion
});

// Farveskift kort / Animate pseodo element

ScrollTrigger.create({
  trigger: ".racesWrapper",
  start: "center center", // Start når wrapperen rammer center af viewporten
  end: () => `+=${getScrollAmount()}`, // Slut når scrollable bredde er nået
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress; // Få normaliseret scroll progress (0 til 1)
    const cards = document.querySelectorAll(".card");
    const totalCards = cards.length; // Total antal kort

    cards.forEach((card, index) => {
      const cardStart = index / totalCards; // Punkt hvor dette korts transition starter
      const cardEnd = (index + 1) / totalCards; // Punkt hvor dette korts transition stopper

      // Hvis det er det første kort, skal det allerede være helt blåt
      if (index === 0) {
        card.style.setProperty("--pseudo-transform", "100%");
      } else if (progress >= cardStart && progress <= cardEnd) {
        // Normaliser fremdrift for dette kort
        const localProgress = (progress - cardStart) / (cardEnd - cardStart); // Normaliser scroll fremdrift for dette kort
        card.style.setProperty("--pseudo-transform", `${localProgress * 100}%`);
      } else if (progress > cardEnd) {
        // Hvis scroll er gået forbi slutningen af dette kort, gør pseudeo-elementet helt blåt
        card.style.setProperty("--pseudo-transform", "100%");
      } else if (progress < cardStart) {
        // Hvis scroll ikke har nået dette kort, reset pseudeo-elementet til 0%
        card.style.setProperty("--pseudo-transform", "0%");
      }
    });
  },
});

// Animer bogstaverne ved scroll

const splitTextWelcome = new SplitType(".welcome-text", {
  types: "words, chars",
  wordClass: "welcome-word", // Hvert ord får en <span class="welcome-word">
  charClass: "welcome-char", // Hver karakter får en <span class="welcome-char">
});

const splitTextDesigner = new SplitType(".designertekst", {
  types: "words, chars",
  wordClass: "designer-word", // Hvert ord får en <span class="welcome-word">
  charClass: "designer-char", // Hver karakter får en <span class="welcome-char">
});

// Sørg for ingen ordbreaks i `.welcome-word`
document.querySelectorAll(".welcome-word").forEach((word) => {
  word.style.whiteSpace = "nowrap"; // Forhindr ord-brydning for hvert ord
});

// Landing page animation intro

const splitTextHeroSec = new SplitType(".word", {
  types: "chars",
  charClass: "hero-char", // Hver karakter får en <span class="welcome-char">
});

const splitTextHeroSec2 = new SplitType(".word2", {
  types: "chars",
  charClass: "hero2-char", // Hver karakter får en <span class="welcome-char">
});

const introLogo = document.getElementById("introLogo");
const introAnimation = document.getElementById("introAnimation");

// GSAP Timeline
const introAnimationTimeline = gsap.timeline({
  onStart: () => {
    // Lås scroll ved starten af intro animationen
    document.body.style.overflow = "hidden";
  },

  onComplete: () => {
    // Skjul alle intro elementer efter complete
    document.body.classList.add("intro-complete");

    // Animer herosection elementer ind med opacity
    gsap.to(".herosection", {
      opacity: 1, // Sæt opaciteten til 1
      duration: 0.5, // Glat fade-in
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

    // Animere mine headlines
    gsap.fromTo(
      ".hero-char, .hero2-char",
      {
        y: 500,
      },
      {
        y: 0,
        duration: 0.6,
        ease: "power1.inOut", // Glat easing
        stagger: 0.01,
      }
    );

    // Animere min velkommen tekst
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
        stagger: 0.003, // Tilføj en forsinkelse mellem hver karakter's animation
      }
    );

    // Animere min designer tekst
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
        stagger: 0.02, // Tilføj en forsinkelse mellem hver karakter's animation
      }
    );
  },
});

// Logo animation fra venstre
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

// Skub den blå baggrund op
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

// Del teksten op i spans til tekst-effekt
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

// Animer tekst-spans
document.querySelectorAll(".splittexteffect").forEach((h1) => {
  const spans = h1.querySelectorAll(".splittexteffect span");

  gsap.fromTo(
    spans,
    { x: -100 }, // Startposition
    {
      x: 0, // Slutposition
      duration: 0.7,
      ease: "power1.out",
      delay: (index) => Math.random() * 0.2 + 0.1,
      scrollTrigger: {
        trigger: ".splittexteffect", // Elementet der udløser animationen
        start: "bottom bottom", // Når toppen af elementet når 75% af viewporten
        end: "center center", // Når toppen af elementet når 25% af viewporten
        toggleActions: "play none none none", // Afspil ved enter, ingen reset
        markers: false,
      },
    }
  );
});

// Animer tal og pil
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
      trigger: ".numb-arrow", // Elementet der udløser animationen
      start: "bottom bottom", // Når toppen af elementet når 75% af viewporten
      end: "center center", // Når toppen af elementet når 25% af viewporten
      toggleActions: "play none none none", // Afspil ved enter, ingen reset
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
      trigger: ".numb-arrow", // Elementet der udløser animationen
      start: "bottom bottom", // Når toppen af elementet når 75% af viewporten
      end: "center center", // Når toppen af elementet når 25% af viewporten
      toggleActions: "play none none none", // Afspil ved enter, ingen reset
      markers: false,
    },
  }
);

// Gem en reference til animationen
let circleAnimation = gsap.to("#circleToAnimate", {
  rotation: 360, // Drej logoet 360 grader
  ease: "none",
  repeat: -1,
  duration: 10,
  transformOrigin: "50% 50%",
  paused: true, // Initialt sat på pause
});

gsap.set("#arrowToAnimate", {
  opacity: 0,
  rotation: 45,
  x: 25,
  transformOrigin: "50% 50%",
  stroke: "#141414",
  strokeWidth: 5,
  fill: "none",
  strokeDasharray: 300,
  strokeDashoffset: 300,
});

// Opret en GSAP-timeline (initialt på pause)
let cursorTimeline = gsap.timeline({ paused: true });

// Definer animationens rækkefølge
cursorTimeline
  .fromTo(
    "#tekstCirkel",
    { x: 100, opacity: 0 }, // Startposition (flyttet til højre)
    { x: 0, opacity: 1, duration: 0.6, ease: "power1.out" } // Flyt til sin plads
  )
  // Pil animation
  .to("#arrowToAnimate", { x: 0, duration: 0.8, ease: "power2.out" }, "-=0.2")
  .to("#arrowToAnimate", { opacity: 1, duration: 0.1 }, "-=1") // Gør pilen synlig før animation
  .to(
    "#arrowToAnimate",
    {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.6"
  )
  .to("#arrowToAnimate", { fill: "#141414", duration: 0.5 }, "-=0.5") // Fyld pilen mens den tegnes
  .to("#arrowToAnimate", { rotation: 0, duration: 1, ease: "Expo.easeOut" });

// Magnetisk knap på min forside kode
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

  // Example: A function that would normally run
  function myFeature() {
      console.log("Feature is active!");
  }

  myFeature();

  // Other event listeners, functions, etc.
}

// Run on page load
runScript();

// Listen for screen size changes and reload the script if necessary
window.addEventListener("resize", () => {
  runScript();
  location.reload(); // Optional: Reload the page to fully disable JS features when resizing
});

// Landing page animation intro

const introLogo = document.getElementById("introLogo");
const introAnimation = document.getElementById("introAnimation");

// GSAP Timeline
const introAnimationTimeline = gsap.timeline({
  onStart: () => {
    // Lås scroll ved starten af intro animationen
    document.body.style.overflow = "hidden";
  },

  onComplete: () => {
    // Skjul alle intro elementer efter complete
    document.body.classList.add("intro-complete");

    // Animer herosection elementer ind med opacity
    gsap.to(".herosection", {
      opacity: 1, // Sæt opaciteten til 1
      duration: 0.5, // Glat fade-in
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

    // Animere mine headlines
    gsap.fromTo(
      ".word h2, .word2 h2, #heroLogo",
      {
        y: 100,
        x: 20,
      },
      {
        y: 0,
        x: 0, // Slutposition (oprindelig placering)
        duration: 0.6,
        ease: "power1.inOut", // Glat easing
      }
    );

    // Animere min velkommen tekst
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
        stagger: 0.003, // Tilføj en forsinkelse mellem hver karakter's animation
      }
    );

    // Animere min designer tekst
    gsap.fromTo(
      ".designer-char, .pilforside",
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
        ease: "power2.out",
        stagger: 0.02, // Tilføj en forsinkelse mellem hver karakter's animation
      }
    );
  },
});

// Logo animation fra venstre
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

// Skub den blå baggrund op
introAnimationTimeline.to(
  introAnimation,
  { y: "-100%", duration: 1.5, ease: "power4.inOut" },
  "+=0.5"
);
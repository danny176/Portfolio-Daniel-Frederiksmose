//Overskrift split type JS og animation

const splitTextZerobuzz = new SplitType(".overskrift", {
  types: "words, chars",
  wordClass: "zero-word", // Hvert ord får en <span class="welcome-word">
  charClass: "zero-char", // Hver karakter får en <span class="welcome-char">
});

gsap.fromTo(
  ".zero-char",
  {
    y: 500,
    x: -100,
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

//Animation af intro tekst kolonner

gsap.fromTo(
  ".info-kolonner",
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
  }
);

//Intro billede animation

gsap
  .timeline()
  .fromTo(
    "#imagerevealdanny",
    { scale: 1.5 },
    { scale: 1, duration: 0.6, ease: "Expo.easeOut" } // Scale first
  )
  .to(
    "#imagerevealdanny",
    { opacity: 1, duration: 1, ease: "Expo.easeOut" },
    "-=0.5" // Opacity starts later
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

//Video reveal animation med imagewrapper som trigger

gsap.utils.toArray(".imagewrapper").forEach((imageWrapper) => {
  gsap.utils.toArray(imageWrapper.querySelectorAll("video")).forEach((video) => {
    gsap.from(video, {
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
      ease: "Expo.easeOut",
      scrollTrigger: {
        trigger: video, // Triggers animation per image
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
});


//Pil animation på hover

const firstArrow = document.querySelector(".first-arrow");
const secondArrow = document.querySelector(".second-arrow");

const tl = gsap.timeline({ paused: true });

tl.to(firstArrow, { y: "-100%", x: "100%", duration: 0.4, ease: "power2.inOut" }, 0) // Move first arrow up & right
  .to(secondArrow, { y: "0%", x: "0%", duration: 0.4, ease: "power2.inOut" }, 0); // Move second arrow into position

document.querySelector(".overskrift-tekst-pil").addEventListener("mouseenter", () => {
  gsap.set(secondArrow, { y: "100%", x: "-100%" }); // Reset second arrow position before starting
  tl.restart();
});

document.querySelector(".overskrift-tekst-pil").addEventListener("mouseleave", () => {
    tl.reverse(); // Reverse the animation when the mouse leaves
  });


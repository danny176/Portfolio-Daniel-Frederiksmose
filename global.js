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

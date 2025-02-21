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

//Animation stagger link effect

const staggerLinks = document.querySelectorAll(".stagger-link");

staggerLinks.forEach((link) => {
  const textElement = link.querySelector(".stagger-link-text");

 
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

//Flyt nav op med scrool
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

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

//Hamburger menu

function toggleMenu() {
  // Toggle the 'open' class on the hamburger icon (jQuery)
  $("#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4").toggleClass("open");

  // Toggle the 'active' class on the menu
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");

  // Toggle the 'no-scroll' class on both <body> and <html>
  document.body.classList.toggle("no-scroll");
  document.documentElement.classList.toggle("no-scroll");

  // If using Lenis smooth scrolling, stop it when the menu is active
  if (window.lenis) {
    if (menu.classList.contains("active")) {
      lenis.stop(); // Stop smooth scrolling
    } else {
      lenis.start(); // Resume smooth scrolling
    }
  }
}


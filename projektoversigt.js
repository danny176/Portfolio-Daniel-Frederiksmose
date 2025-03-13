//Overskrift animation

//Overskrift split type JS og animation

const splitTextProj = new SplitType(".overskrift", {
  types: "chars",
  charClass: "proj-char", // Hver karakter får en <span class="welcome-char">
});

gsap.fromTo(
  ".proj-char",
  {
    y: 300,
    x: 0,
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
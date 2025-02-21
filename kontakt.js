const splitTextDesigner = new SplitType(".kontaktoverskrift", {
  types: "chars",
  charClass: "kontakt-char", // Hver karakter får en <span class="welcome-char">
});

// Animere min designer tekst
gsap.fromTo(
  ".kontakt-char",
  {
    y: 300,
    x: 0,
    opacity: 0,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
    stagger: 0.009, // Tilføj en forsinkelse mellem hver karakter's animation
  }
);

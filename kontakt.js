const splitTextKontakt = new SplitType(".kontaktoverskrift", {
  types: "chars",
  charClass: "kontakt-char", // Hver karakter får en <span class="welcome-char">
});

// Animere min designer tekst
gsap.fromTo(
  ".kontakt-char",
  {
    y: 300,
    x: -50,
    opacity: 1,
  },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.01, // Tilføj en forsinkelse mellem hver karakter's animation
  }
);

//Copy to clipboard

const splitTextInfo = new SplitType(".slideinfo", {
  types: "chars",
  charClass: "slide-char", // Hver karakter får en <span class="welcome-char">
});

// Animere min designer tekst
gsap.fromTo(
  ".slide-char",
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
    ease: "Expo.easeOut",
    stagger: 0.005, // Tilføj en forsinkelse mellem hver karakter's animation
  }
);


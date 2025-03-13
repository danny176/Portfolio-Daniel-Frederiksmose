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

//Billede reveal animation med imagewrapper som trigger

gsap.utils.toArray(".billedecontainer").forEach((imageWrapper) => {
  gsap.from(imageWrapper.querySelector("img"), {
    opacity: 0,
    scale: 1.1,
    duration: 1.5,
    ease: "Expo.easeOut",
    scrollTrigger: {
      trigger: imageWrapper,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    onComplete: function () {
      gsap.set(imageWrapper.querySelector("img"), { clearProps: "scale" }); // Removes the scale property so hover works
    },
  });
});

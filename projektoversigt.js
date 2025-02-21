gsap.fromTo(
    ".overskrift",
    {
      y: 100,
      x: 0,
      opacity: 0
    },
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "Expo.easeOut",
    }
  );
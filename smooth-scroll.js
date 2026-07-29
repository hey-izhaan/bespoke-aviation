const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function updateFooterParallax() {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  const rect = footer.getBoundingClientRect();
  const progress = Math.max(
    0,
    Math.min(1, (window.innerHeight - rect.top) / rect.height),
  );

  footer.style.setProperty(
    "--footer-parallax",
    `${(progress - 1) * 96}px`,
  );
}

function updateHeroParallax() {
  const hero = document.querySelector(
    ".hero, .aircraft-hero, .contact-personal, .legal-hero",
  );
  if (!hero) return;

  const rect = hero.getBoundingClientRect();
  const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
  const progress = Math.max(
    0,
    Math.min(
      1,
      (headerHeight - rect.top) / Math.min(rect.height, window.innerHeight),
    ),
  );

  hero.style.setProperty("--hero-parallax", `${progress * 84}px`);
}

function updateParallax() {
  updateHeroParallax();
  updateFooterParallax();
}

if (!reducedMotion) {
  if (typeof Lenis !== "undefined") {
    window.lenis = new Lenis({
      autoRaf: true,
      anchors: true,
    });

    window.lenis.on("scroll", updateParallax);
  } else {
    window.addEventListener("scroll", updateParallax, { passive: true });
  }

  window.addEventListener("resize", updateParallax);
  updateParallax();
}

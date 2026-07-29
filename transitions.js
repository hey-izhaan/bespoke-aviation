const transitionDuration = matchMedia("(prefers-reduced-motion: reduce)").matches
  ? 0
  : 0.35;

function updateNavigation(namespace) {
  const currentHref = {
    home: "index.html",
    aircraft: "available-aircraft.html",
    contact: "contact-us.html",
  }[namespace];

  document.querySelectorAll(".main-nav a, .header-cta").forEach((link) => {
    if (link.getAttribute("href") === currentHref) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");

function setMenuOpen(open, restoreFocus = false) {
  if (!menuToggle || !siteMenu) return;

  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

  if (open) {
    window.lenis?.stop();
    requestAnimationFrame(() => siteMenu.querySelector("a")?.focus());
  } else {
    window.lenis?.start();
    if (restoreFocus) menuToggle.focus();
  }
}

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!document.body.classList.contains("menu-open"));
});

siteMenu?.addEventListener("click", ({ target }) => {
  if (target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (!document.body.classList.contains("menu-open")) return;

  if (event.key === "Escape") {
    setMenuOpen(false, true);
    return;
  }

  if (event.key === "Tab") {
    const focusable = [menuToggle, ...siteMenu.querySelectorAll("a")];
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

matchMedia("(min-width: 901px)").addEventListener("change", ({ matches }) => {
  if (matches) setMenuOpen(false);
});

const reviews = [
  {
    quote:
      "As always, Mark was professional, courteous, and flexible making the whole process seamless.",
    name: "T.G.W.",
  },
  {
    quote: "I would definitely recommend Bespoke Aviation.",
    name: "D.T.",
  },
  {
    quote:
      "Great arrangement and set up topped with excellent service all the way.",
    name: "A.P.",
  },
  {
    quote:
      "Bespoke Aviation was beyond excellent, a special mention to Mark.",
    name: "N.V.",
  },
  {
    quote:
      "Bespoke Aviation are my go to place for all my private air services",
    name: "M.W.",
  },
  {
    quote:
      "Our family of 8 travelled with Bespoke Aviation, excellent services from booking to arrival.",
    name: "S.Y.",
  },
];

let currentReview = 0;

function showReview(index) {
  const testimonial = document.querySelector(".testimonial");
  if (!testimonial) return;

  currentReview = (index + reviews.length) % reviews.length;
  const review = reviews[currentReview];

  testimonial.querySelector("blockquote").textContent = `“${review.quote}”`;
  testimonial.querySelector(".client-name").textContent =
    `${review.name} — Bespoke Aviation client`;
  testimonial.querySelector(".testimonial-nav > span").textContent =
    `${String(currentReview + 1).padStart(2, "0")} / ${String(reviews.length).padStart(2, "0")}`;
  testimonial
    .querySelector(".testimonial-copy")
    .setAttribute("aria-live", "polite");
}

document.addEventListener("click", ({ target }) => {
  const button = target.closest(".testimonial-nav button");
  if (!button) return;

  const buttons = [...button.parentElement.querySelectorAll("button")];
  showReview(currentReview + (button === buttons[0] ? -1 : 1));
});

showReview(currentReview);

barba.init({
  transitions: [
    {
      name: "page-fade",
      leave({ current }) {
        window.lenis?.stop();

        return gsap.to(current.container, {
          opacity: 0,
          duration: transitionDuration,
        });
      },
      afterLeave() {
        window.lenis
          ? window.lenis.scrollTo(0, { immediate: true })
          : scrollTo(0, 0);
      },
      beforeEnter({ next }) {
        updateNavigation(next.namespace);
      },
      enter({ next }) {
        return gsap.fromTo(
          next.container,
          { opacity: 0 },
          { opacity: 1, duration: transitionDuration },
        );
      },
      afterEnter({ next }) {
        requestAnimationFrame(() => {
          next.container
            .querySelectorAll("video[autoplay]")
            .forEach((video) => {
              video.muted = true;
              video.load();
              video.play().catch(() => {});
            });
          window.lenis?.resize();
          window.lenis?.start();
        });
      },
    },
  ],
});

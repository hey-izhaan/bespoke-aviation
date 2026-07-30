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

document.body.insertAdjacentHTML("beforeend", `<aside class="chat-widget" aria-label="Contact Bespoke Aviation">
  <div class="chat-teaser"><button class="chat-teaser-open" type="button" aria-expanded="false" aria-controls="chat-panel"><img src="Public/Hero%20Thumbnail.png" alt=""><span>Hi there, have a question?<strong>Talk to us.</strong></span></button><button class="chat-teaser-close" type="button" aria-label="Dismiss message">&times;</button></div>
  <section class="chat-panel" id="chat-panel" aria-hidden="true" inert>
    <header class="chat-panel-header"><img src="Public/Hero%20Thumbnail.png" alt=""><div><strong>Have a question?</strong><span>We’re here to help.</span></div><button class="chat-panel-close" type="button" aria-label="Close contact form">&times;</button></header>
    <div class="chat-panel-body"><p class="chat-intro">Tell us what you need and Mark will get back to you personally.</p><form class="chat-form">
      <label><span>Name</span><input name="name" autocomplete="name" placeholder="Name *" required></label>
      <label><span>Phone</span><input name="phone" type="tel" autocomplete="tel" placeholder="Phone"></label>
      <label><span>Email</span><input name="email" type="email" autocomplete="email" placeholder="Email *" required></label>
      <label><span>Message</span><textarea name="message" placeholder="How can we help? *" required></textarea></label>
      <label class="chat-consent"><input type="checkbox" required><span>I agree that Bespoke Aviation may contact me about this enquiry.</span></label>
      <button class="chat-send" type="submit">Send enquiry <span aria-hidden="true">↗</span></button><p class="chat-status" aria-live="polite"></p>
    </form></div>
  </section>
  <button class="chat-toggle" type="button" aria-label="Open contact form" aria-expanded="false" aria-controls="chat-panel"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7.5 21.5 5 27l6-2.5c1.5.7 3.2 1 5 1 6.1 0 11-4.3 11-9.7S22.1 6 16 6 5 10.3 5 15.8c0 2.1.9 4.1 2.5 5.7Z"/><path d="M11 13h10M11 18h7"/></svg></button>
</aside>`);

const chatWidget = document.querySelector(".chat-widget");
const chatPanel = chatWidget.querySelector(".chat-panel");
const chatToggle = chatWidget.querySelector(".chat-toggle");
const chatTeaserOpen = chatWidget.querySelector(".chat-teaser-open");

function setChatOpen(open) {
  chatWidget.classList.toggle("is-open", open);
  chatPanel.inert = !open;
  chatPanel.setAttribute("aria-hidden", String(!open));
  [chatToggle, chatTeaserOpen].forEach((button) => button.setAttribute("aria-expanded", String(open)));
  chatToggle.setAttribute("aria-label", `${open ? "Close" : "Open"} contact form`);
  if (open) requestAnimationFrame(() => chatPanel.querySelector("input")?.focus());
}

chatToggle.addEventListener("click", () => setChatOpen(!chatWidget.classList.contains("is-open")));
chatTeaserOpen.addEventListener("click", () => setChatOpen(true));
chatWidget.querySelector(".chat-teaser-close").addEventListener("click", () => chatWidget.classList.add("is-teaser-dismissed"));
chatWidget.querySelector(".chat-panel-close").addEventListener("click", () => { setChatOpen(false); chatToggle.focus(); });
document.addEventListener("keydown", ({ key }) => {
  if (key === "Escape" && chatWidget.classList.contains("is-open")) { setChatOpen(false); chatToggle.focus(); }
});

chatWidget.querySelector(".chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = `Name: ${data.get("name")}\nPhone: ${data.get("phone") || "Not provided"}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
  chatWidget.querySelector(".chat-status").textContent = "Opening your email app…";
  location.href = `mailto:mark@bespoke-aviation.com?subject=Website enquiry from ${encodeURIComponent(data.get("name"))}&body=${encodeURIComponent(body)}`;
});

const sliderSpeed = matchMedia("(prefers-reduced-motion: reduce)").matches
  ? 0
  : 550;

function setTestimonialCount(swiper, count) {
  if (!count) return;
  count.textContent = `${String(swiper.realIndex + 1).padStart(2, "0")} / ${String(swiper.slides.length).padStart(2, "0")}`;
}

function initPageSliders(container) {
  if (!container || typeof Swiper === "undefined") return;

  const testimonial = container.querySelector(".testimonial-swiper");
  if (testimonial && !testimonial.swiper) {
    const copy = testimonial.closest(".testimonial-copy");
    const count = copy.querySelector(".testimonial-count");

    new Swiper(testimonial, {
      slidesPerView: 1,
      speed: sliderSpeed,
      effect: "fade",
      fadeEffect: { crossFade: true },
      autoHeight: true,
      loop: true,
      grabCursor: true,
      keyboard: { enabled: true, onlyInViewport: true },
      navigation: {
        prevEl: copy.querySelector(".testimonial-prev"),
        nextEl: copy.querySelector(".testimonial-next"),
      },
      on: {
        init(swiper) {
          setTestimonialCount(swiper, count);
        },
        slideChange(swiper) {
          setTestimonialCount(swiper, count);
        },
      },
    });
  }

  container.querySelectorAll(".aircraft-swiper").forEach((slider) => {
    if (slider.swiper || slider.querySelectorAll(".swiper-slide").length < 2)
      return;

    new Swiper(slider, {
      slidesPerView: 1,
      speed: sliderSpeed,
      effect: "fade",
      fadeEffect: { crossFade: true },
      grabCursor: true,
      rewind: true,
      watchOverflow: true,
      keyboard: { enabled: true, onlyInViewport: true },
      navigation: {
        prevEl: slider.querySelector(".aircraft-slider-prev"),
        nextEl: slider.querySelector(".aircraft-slider-next"),
      },
    });
  });
}

function destroyPageSliders(container) {
  container?.querySelectorAll(".swiper-initialized").forEach((slider) => {
    slider.swiper?.destroy(true, true);
  });
}

initPageSliders(document.querySelector('[data-barba="container"]'));

barba.init({
  transitions: [
    {
      name: "page-fade",
      beforeLeave({ current }) {
        destroyPageSliders(current.container);
      },
      leave({ current }) {
        window.lenis?.stop();

        return gsap.to(current.container, {
          opacity: 0,
          duration: transitionDuration,
        });
      },
      afterLeave() {
        window.lenis
          ? window.lenis.scrollTo(0, { immediate: true, force: true })
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
          initPageSliders(next.container);
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

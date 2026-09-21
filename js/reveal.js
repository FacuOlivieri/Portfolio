import { prefersReducedMotion } from "./config.js";

const STAGGER_STEP_MS = 70;
const MAX_STAGGER_STEPS = 6;

const getRevealIndexAmongSiblings = (element) => {
  const revealSiblings = [...element.parentElement.children].filter((child) =>
    child.classList.contains("reveal"),
  );
  return Math.max(0, revealSiblings.indexOf(element));
};

const revealElement = (element) => {
  const staggerSteps = Math.min(getRevealIndexAmongSiblings(element), MAX_STAGGER_STEPS);
  element.style.transitionDelay = `${staggerSteps * STAGGER_STEP_MS}ms`;
  element.classList.remove("is-pending");
};

const isBelowViewport = (element) => element.getBoundingClientRect().top > window.innerHeight;

const createRevealObserver = () =>
  new IntersectionObserver(
    (entries, observer) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

export const initRevealOnScroll = () => {
  if (!("IntersectionObserver" in window) || prefersReducedMotion()) return;

  const observer = createRevealObserver();
  // Solo se "preparan" los elementos que todavía están fuera de pantalla
  document.querySelectorAll(".reveal").forEach((element) => {
    if (!isBelowViewport(element)) return;
    element.classList.add("is-pending");
    observer.observe(element);
  });
};

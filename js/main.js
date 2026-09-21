/* =========================================================
   Facundo Olivieri — Portfolio · punto de entrada
   ========================================================= */

import { loadFragments } from "./fragments.js";
import { initScrollSync } from "./scroll-sync.js";
import { initRevealOnScroll } from "./reveal.js";
import { initPortraitParallax } from "./portrait-parallax.js";
import { initProjectCardsGlow } from "./project-cards.js";
import { initCopyEmailButtons } from "./copy-email.js";
import { initContactForm } from "./contact-form.js";
import { renderCurrentYear } from "./footer-year.js";

const enableJsStyles = () => document.documentElement.classList.add("js");

const initInteractions = () => {
  initScrollSync();
  initRevealOnScroll();
  initPortraitParallax();
  initProjectCardsGlow();
  initCopyEmailButtons();
  initContactForm();
  renderCurrentYear();
};

const start = async () => {
  enableJsStyles();
  await loadFragments();
  initInteractions();
};

start().catch((error) => console.error(error));

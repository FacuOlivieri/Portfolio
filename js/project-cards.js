const trackPointerInside = (card, event) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

export const initProjectCardsGlow = () => {
  document.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("pointermove", (event) => trackPointerInside(card, event));
  });
};

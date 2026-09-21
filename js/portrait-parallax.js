import { hasFinePointer, prefersReducedMotion } from "./config.js";

const MAX_OFFSET_X_PX = 14;
const MAX_OFFSET_Y_PX = 10;

const getCenteredPointerRatio = (event, element) => {
  const rect = element.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) / rect.width - 0.5,
    y: (event.clientY - rect.top) / rect.height - 0.5,
  };
};

const setPortraitOffset = (portrait, x, y) => {
  portrait.style.setProperty("--tx", `${x}px`);
  portrait.style.setProperty("--ty", `${y}px`);
};

const followPointer = (portrait, event) => {
  const ratio = getCenteredPointerRatio(event, portrait);
  setPortraitOffset(
    portrait,
    (ratio.x * MAX_OFFSET_X_PX).toFixed(1),
    (ratio.y * MAX_OFFSET_Y_PX).toFixed(1),
  );
};

export const initPortraitParallax = () => {
  const portrait = document.getElementById("portrait");
  if (!portrait || !hasFinePointer() || prefersReducedMotion()) return;

  portrait.addEventListener("pointermove", (event) => followPointer(portrait, event));
  portrait.addEventListener("pointerleave", () => setPortraitOffset(portrait, 0, 0));
};

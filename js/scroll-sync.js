import { createActiveSectionUpdater } from "./navigation.js";
import { createScrollProgressUpdater } from "./scroll-progress.js";

const throttleToAnimationFrame = (callback) => {
  let isScheduled = false;

  return () => {
    if (isScheduled) return;
    isScheduled = true;
    requestAnimationFrame(() => {
      callback();
      isScheduled = false;
    });
  };
};

export const initScrollSync = () => {
  const updateActiveSection = createActiveSectionUpdater();
  const updateScrollProgress = createScrollProgressUpdater();

  const onScroll = throttleToAnimationFrame(() => {
    updateActiveSection();
    updateScrollProgress();
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", onScroll);
  onScroll();
};

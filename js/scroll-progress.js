const getScrollRatio = () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  return maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
};

export const createScrollProgressUpdater = () => {
  const progressBar = document.querySelector(".rail__progress span");

  return () => progressBar?.style.setProperty("--p", getScrollRatio().toFixed(4));
};

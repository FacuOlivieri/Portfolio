const ACTIVE_PROBE_RATIO = 0.4;
const BOTTOM_TOLERANCE_PX = 4;

const getNavLinks = () => [...document.querySelectorAll(".rail__list .rail__link")];

const getLinkedSections = (links) =>
  links.map((link) => document.getElementById(link.dataset.section)).filter(Boolean);

const moveIndicatorTo = (indicator, link) => {
  if (!indicator || !link) return;
  const y = link.offsetTop + (link.offsetHeight - indicator.offsetHeight) / 2;
  indicator.style.setProperty("--iy", `${y}px`);
};

const markLinkActive = (link, isActive) => {
  link.classList.toggle("is-active", isActive);
  if (isActive) link.setAttribute("aria-current", "true");
  else link.removeAttribute("aria-current");
};

const isScrolledToBottom = () =>
  window.innerHeight + window.scrollY >= document.body.scrollHeight - BOTTOM_TOLERANCE_PX;

const findCurrentSectionId = (sections) => {
  // Al llegar al final, siempre gana la última sección
  if (isScrolledToBottom()) return sections.at(-1)?.id;

  const probeLine = window.innerHeight * ACTIVE_PROBE_RATIO;
  const passedSections = sections.filter((section) => section.getBoundingClientRect().top <= probeLine);
  return (passedSections.at(-1) ?? sections[0])?.id;
};

export const createActiveSectionUpdater = () => {
  const links = getNavLinks();
  const sections = getLinkedSections(links);
  const indicator = document.querySelector(".rail__indicator");

  return () => {
    const currentId = findCurrentSectionId(sections);
    links.forEach((link) => {
      const isActive = link.dataset.section === currentId;
      markLinkActive(link, isActive);
      if (isActive) moveIndicatorTo(indicator, link);
    });
  };
};

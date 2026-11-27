import { CONFIG } from "./config.js";
import { showToast } from "./toast.js";

const HINT_RESET_MS = 1800;

const flashCopiedHint = (button) => {
  const hint = button.querySelector(".info__hint");
  if (!hint) return;

  hint.textContent = "¡Copiado!";
  setTimeout(() => (hint.textContent = "Copiar"), HINT_RESET_MS);
};

const openMailClient = (email) => {
  window.location.href = `mailto:${email}`;
};

const copyEmail = async (button) => {
  try {
    await navigator.clipboard.writeText(CONFIG.email);
    showToast("Email copiado al portapapeles");
    flashCopiedHint(button);
  } catch {
    openMailClient(CONFIG.email);
  }
};

export const renderEmail = () => {
  document.querySelectorAll("[data-email]").forEach((element) => (element.textContent = CONFIG.email));
  document.querySelectorAll("[data-email-link]").forEach((link) => (link.href = `mailto:${CONFIG.email}`));
};

export const initCopyEmailButtons = () => {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => copyEmail(button));
  });
};

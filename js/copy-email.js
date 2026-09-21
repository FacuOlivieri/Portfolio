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
  const email = button.dataset.copy;
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copiado al portapapeles");
    flashCopiedHint(button);
  } catch {
    openMailClient(email);
  }
};

export const initCopyEmailButtons = () => {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => copyEmail(button));
  });
};

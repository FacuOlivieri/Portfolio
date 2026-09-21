const TOAST_DURATION_MS = 2600;

let hideTimer;

const hideToast = (toastElement) => toastElement.classList.remove("is-on");

export const showToast = (message) => {
  const toastElement = document.getElementById("toast");
  if (!toastElement) return;

  toastElement.textContent = message;
  toastElement.classList.add("is-on");
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => hideToast(toastElement), TOAST_DURATION_MS);
};

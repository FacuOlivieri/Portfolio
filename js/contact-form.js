import { CONFIG } from "./config.js";
import { showToast } from "./toast.js";
import { deliverMessage } from "./form-delivery.js";
import { enableLiveValidation, focusFirstInvalidField, validateAllFields } from "./form-validation.js";

const getFormElements = (form) => ({
  form,
  inputs: [...form.querySelectorAll("input, textarea")],
  status: document.getElementById("f-status"),
  submitButton: document.getElementById("f-submit"),
  message: document.getElementById("f-mensaje"),
  counter: document.getElementById("f-count"),
});

const updateCharacterCounter = ({ message, counter }) => {
  counter.textContent = `${message.value.length} / ${message.maxLength}`;
};

const setStatus = ({ status }, text, kind) => {
  status.textContent = text;
  status.className = `form__status${kind ? ` is-${kind}` : ""}`;
};

const setSending = ({ submitButton }, isSending) => {
  submitButton.classList.toggle("is-sending", isSending);
};

const resetForm = (elements) => {
  elements.form.reset();
  updateCharacterCounter(elements);
};

const handleSubmit = async (event, elements) => {
  event.preventDefault();

  if (!validateAllFields(elements.form, elements.inputs)) {
    setStatus(elements, "Revisá los campos marcados.", "err");
    focusFirstInvalidField(elements.form);
    return;
  }

  const data = Object.fromEntries(new FormData(elements.form));
  setSending(elements, true);
  setStatus(elements, "Enviando…");

  try {
    const result = await deliverMessage(data);
    setStatus(elements, result.status, "ok");
    showToast(result.toast);
    // Con mailto no sabemos si el mensaje salió: se conserva lo escrito
    if (result.sent) resetForm(elements);
  } catch {
    setStatus(elements, `No se pudo enviar. Escribime directo a ${CONFIG.email}.`, "err");
  } finally {
    setSending(elements, false);
  }
};

export const initContactForm = () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const elements = getFormElements(form);
  elements.message.addEventListener("input", () => updateCharacterCounter(elements));
  enableLiveValidation(form, elements.inputs);
  form.addEventListener("submit", (event) => handleSubmit(event, elements));
};

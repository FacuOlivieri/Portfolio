const ERROR_MESSAGES = {
  "f-nombre": { valueMissing: "Contame tu nombre.", tooShort: "El nombre es muy corto." },
  "f-email": { valueMissing: "Necesito un email para responderte.", typeMismatch: "Revisá el formato del email (ej: nombre@dominio.com)." },
  "f-asunto": { valueMissing: "Agregá un asunto.", tooShort: "El asunto es muy corto." },
  "f-mensaje": { valueMissing: "Escribí tu mensaje.", tooShort: "El mensaje debe tener al menos 10 caracteres." },
};

const trimLeadingSpaces = (input) => {
  input.value = input.value.replace(/^\s+/, "");
};

const getErrorMessage = (input) => {
  const { validity } = input;
  if (validity.valid) return "";

  const messages = ERROR_MESSAGES[input.id] ?? {};
  return (
    (validity.valueMissing && messages.valueMissing) ||
    (validity.typeMismatch && messages.typeMismatch) ||
    (validity.tooShort && messages.tooShort) ||
    input.validationMessage
  );
};

const renderFieldError = (form, input, message) => {
  const hasError = Boolean(message);
  input.closest(".field").classList.toggle("has-error", hasError);
  input.setAttribute("aria-invalid", String(hasError));

  const errorOutput = form.querySelector(`.field__error[data-for="${input.id}"]`);
  if (errorOutput) errorOutput.textContent = message;
};

const fieldHasError = (input) => input.closest(".field").classList.contains("has-error");

export const validateField = (form, input) => {
  trimLeadingSpaces(input);
  const message = getErrorMessage(input);
  renderFieldError(form, input, message);
  return !message;
};

export const validateAllFields = (form, inputs) =>
  inputs.map((input) => validateField(form, input)).every(Boolean);

export const enableLiveValidation = (form, inputs) => {
  inputs.forEach((input) => {
    input.addEventListener("blur", () => input.value && validateField(form, input));
    input.addEventListener("input", () => fieldHasError(input) && validateField(form, input));
  });
};

export const focusFirstInvalidField = (form) => {
  form.querySelector(".has-error input, .has-error textarea")?.focus();
};

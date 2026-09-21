import { CONFIG } from "./config.js";

const postToEndpoint = async (data) => {
  const response = await fetch(CONFIG.formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.status);
};

const buildMailtoLink = (data) => {
  const body = `${data.mensaje}\n\n— ${data.nombre} (${data.email})`;
  return `mailto:${CONFIG.email}?subject=${encodeURIComponent(data.asunto)}&body=${encodeURIComponent(body)}`;
};

const openMailDraft = (data) => {
  window.location.href = buildMailtoLink(data);
};

// Envía por endpoint si está configurado; si no, prepara el mail. Devuelve los textos de éxito.
export const deliverMessage = async (data) => {
  if (CONFIG.formEndpoint) {
    await postToEndpoint(data);
    return { status: "¡Mensaje enviado! Te respondo pronto.", toast: "201 Created · mensaje enviado" };
  }

  openMailDraft(data);
  return { status: "Se abrió tu app de correo con el mensaje listo para enviar.", toast: "Mensaje preparado en tu correo" };
};

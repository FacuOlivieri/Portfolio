export const CONFIG = {
  // Pegá acá tu endpoint de Formspree (https://formspree.io) para recibir los mensajes
  // directo en tu mail, por ejemplo: "https://formspree.io/f/abcdwxyz".
  // Si queda vacío, el formulario abre el cliente de correo con el mensaje armado.
  formEndpoint: "https://formspree.io/f/xoedbzzr",
  // Partido a propósito: los recolectores de spam simples no lo encuentran en el código
  email: ["facu.olivieri7", "gmail.com"].join("@"),
};

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  window.matchMedia("(pointer: fine)").matches;

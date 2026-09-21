const fetchFragmentHtml = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se pudo cargar ${url} (${response.status})`);
  return response.text();
};

const htmlToNodes = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content;
};

const replacePlaceholder = async (placeholder) => {
  const html = await fetchFragmentHtml(placeholder.dataset.fragment);
  placeholder.replaceWith(htmlToNodes(html));
};

export const loadFragments = () => {
  const placeholders = [...document.querySelectorAll("[data-fragment]")];
  return Promise.all(placeholders.map(replacePlaceholder));
};

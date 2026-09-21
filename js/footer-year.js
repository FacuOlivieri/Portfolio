export const renderCurrentYear = () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
};

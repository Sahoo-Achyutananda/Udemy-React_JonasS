export function randomHeight() {
  const h = Math.floor(Math.random() * 300);
  return `${h}px`;
}

export function getWidth() {
  const container = document.querySelector(".container");
  const containerWidth = window.getComputedStyle(container);
}

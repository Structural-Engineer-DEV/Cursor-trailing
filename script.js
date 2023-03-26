const images = document.getElementsByClassName("image");
console.log(images);
const maxDistance = 70;
const visibleImages = 4;

let globalIndex = 0;
let last = { x: 0, y: 0 };

const activate = function (image, x, y) {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;
  image.dataset.status = "active";
  last = { x, y };
};

const distanceFromLast = function (x, y) {
  return Math.hypot(x - last.x, y - last.y);
};

window.onmousemove = (e) => {
  if (distanceFromLast(e.clientX, e.clientY) > maxDistance) {
    const lead = images[globalIndex % images.length];
    const tail = images[(globalIndex - visibleImages) % images.length];

    activate(lead, e.clientX, e.clientY);

    if (tail) tail.dataset.status = "inactive";

    globalIndex++;
  }
};

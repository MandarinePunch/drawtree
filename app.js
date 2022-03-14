const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const color = ["#F08080", "#FFC0CB", "#FFE4E1", "#FFB6C1"];

const depth = 11;

const draw = (startX, startY, startDepth, angle, branchWidth) => {
  if (startDepth === depth) {
    return;
  }

  ctx.beginPath();

  let len = startDepth === 0 ? random(10, 14) : random(0, 10);
  const endX =
    startX + Math.cos((angle / 180) * Math.PI) * len * (depth - startDepth);
  const endY =
    startY + Math.sin((angle / 180) * Math.PI) * len * (depth - startDepth);

  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);

  if (branchWidth < 2) {
    branchWidth = random(3, 5);
    ctx.strokeStyle = color[Math.floor(Math.random() * 4)];
  } else {
    ctx.strokeStyle = "black";
  }
  ctx.lineWidth = branchWidth;
  ctx.stroke();

  draw(endX, endY, startDepth + 1, angle - random(15, 25), branchWidth * 0.8);
  draw(endX, endY, startDepth + 1, angle + random(15, 25), branchWidth * 0.8);
};

const random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min) + 1);
};

const handleClick = (event) => {
  const { clientX } = event;
  draw(clientX, canvas.height, 0, -90, 15);
};

const handleResize = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", handleResize);
window.addEventListener("click", handleClick);

const cursor = document.querySelector('#cursor');
cursor.style.display = 'none';
cursor.style.height = '1px';
cursor.style.width = '1px';

const draw = document.querySelector('#draw');
draw.checked = false;

const erase = document.querySelector('#erase');
erase.checked = false;

const canvas = document.querySelector('canvas');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight-80;
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height);

const drawSize = document.querySelector('#favsize');
const span1 = document.querySelector('.drawText');
drawSize.value = 1;
drawSize.onchange = function() {
  span1.textContent = drawSize.value;
};

const eraseSize = document.querySelector('#erasesize');
const span2 = document.querySelector('.eraseText');
eraseSize.value = 1;
eraseSize.onchange = function() {
  span2.textContent = eraseSize.value;
  cursor.style.height = eraseSize.value + 'px';
  cursor.style.width = eraseSize.value + 'px';
};

let drawActive;
let eraseActive;
let eraseStyle;
let x1;
let y1;

draw.onclick = () => {
  if (draw.checked === true) {
    erase.checked = false;
    canvas.style.cursor = 'default';
    cursor.style.display = 'none';
    eraseStyle = false;
  }
};

erase.onclick = () => {
  if (erase.checked === true) {
    draw.checked = false;
    canvas.style.cursor = 'none';
    cursor.style.display = 'block';
    eraseStyle = true;
  }
};

canvas.onmousemove = (e) => {
  if (drawActive) {
    let color = 'rgba(' + random(0,255) + ', ' + random(0,255) + ', ' + random(0,255) + ', ' + random(0,1) +')';
    drawLine(ctx, x1, y1, e.offsetX, e.offsetY, color, drawSize.value);
  } else if (eraseActive) {
    drawLine(ctx, x1, y1, e.offsetX, e.offsetY, 'black', eraseSize.value);
    x1 = e.offsetX;
    y1 = e.offsetY;
  }
  if (eraseStyle) {
    let event = window.event;
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
  }
};

canvas.onmousedown = (e) => {
  x1 = e.offsetX;
  y1 = e.offsetY;
  if (draw.checked === true) {
    drawActive = true;
    eraseActive = false;
  }
};

cursor.onmousedown = () => {
  let event = window.event;
  x1 = event.clientX;
  y1 = event.clientY - 80;
  drawActive = false;
  eraseActive = true;
  console.log("eraseActive is true now");
}

canvas.onmouseup = () => {
  if (draw.checked === true) {
    drawActive = false;
  }
};

cursor.onmouseup = () => {
  eraseActive = false;
}

function drawLine(context, x1, y1, x2, y2, color, width) {
  context.strokeStyle = color;
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

function random(min, max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

function degToRad(degrees) {
  return degrees * Math.PI /180;
}

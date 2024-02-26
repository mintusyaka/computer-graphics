let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = 800;
let window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

// context.beginPath();
context.moveTo(window_width / 2, 0);
context.lineTo(window_width / 2, window_height);

context.moveTo(0, window_height / 2);
context.lineTo(window_width, window_height / 2);
context.stroke();

context.font = "12px serif";
context.fillText(0, window_width / 2 - 12, window_height / 2 + 15);

// context.textAlign = "start";
for (let i = 0; i < window_width / 2; i += 10) {
  context.moveTo(window_width / 2 + i, window_height / 2 - 3);
  context.lineTo(window_width / 2 + i, window_height / 2 + 3);
  context.moveTo(window_width / 2 - i, window_height / 2 - 3);
  context.lineTo(window_width / 2 - i, window_height / 2 + 3);

  context.stroke();

  if (i % 50 == 0 && i != 0) {
    context.fillText(i / 10, window_width / 2 - 5 + i, window_height / 2 + 14);
    context.fillText(
      -i / 10,
      window_width / 2 - 10 - i,
      window_height / 2 + 14
    );
  }
}

for (let i = 0; i < window_height / 2; i += 10) {
  context.moveTo(window_width / 2 - 3, window_height / 2 + i);
  context.lineTo(window_width / 2 + 3, window_height / 2 + i);
  context.moveTo(window_width / 2 - 3, window_height / 2 - i);
  context.lineTo(window_width / 2 + 3, window_height / 2 - i);

  context.stroke();
  if (i % 50 == 0 && i != 0) {
    context.fillText(-i / 10, window_width / 2 - 20, window_height / 2 + i + 5);
    context.fillText(i / 10, window_width / 2 - 20, window_height / 2 - i + 5);
  }
}

context.font = "20px serif";

context.moveTo(window_width, window_height / 2);
context.lineTo(window_width - 5, window_height / 2 + 5);
context.moveTo(window_width, window_height / 2);
context.lineTo(window_width - 5, window_height / 2 - 5);
context.fillText("x", window_width - 15, window_height / 2 + 30);

context.moveTo(window_width / 2, 0);
context.lineTo(window_width / 2 - 5, 5);
context.moveTo(window_width / 2, 0);
context.lineTo(window_width / 2 + 5, 5);
context.fillText("y", window_width / 2 - 20, 15);

context.stroke();
// for (let i = 0; i < window_width / 2; i += 10) {
//   console.log(typeof i);
//   context.moveTo(window_width / 2 + i, window_height / 2 - 3);
//   context.lineTo(window_width / 2 + i, window_height / 2 + 3);
//   context.stroke();
//   if (i % 50 == 0)
//     context.fillText(i / 10, window_width / 2 - 10 + i, window_height / 2 + 14);
// }

// context.stroke();

class Triangle {
  constructor(Ax, Ay, Bx, By, height, color, rectangle_color) {
    this.Ax = Ax * 10 + window_width / 2;
    this.Ay = -Ay * 10 + window_height / 2;
    this.Bx = Bx * 10 + window_width / 2;
    this.By = -By * 10 + window_height / 2;
    this.height = height * 10;
    this.color = color;
    this.rectangle_color = rectangle_color;
  }

  #determine(Ax, Ay, Bx, By, length) {
    let px = this.Ax - this.Bx;
    let py = this.Ay - this.By;
    const len = length / Math.hypot(px, py);
    px *= len;
    py *= len;
    return [-py, px];
  }

  draw() {
    // let region = new Path2D();
    context.beginPath();

    context.moveTo(this.Ax, this.Ay);
    context.lineTo(this.Bx, this.By);
    context.moveTo(this.Bx, this.By);

    let coords = this.#determine(
      this.Ax,
      this.Ay,
      this.Bx,
      this.By,
      this.height
    );
    context.lineTo(
      (this.Bx + this.Ax) / 2 + coords[0],
      (this.By + this.Ay) / 2 + coords[1]
    );

    context.lineTo(this.Ax, this.Ay);

    context.closePath();

    context.fillStyle = this.color;
    context.fill();
    // context.strokeStyle = "blue";
    context.stroke();
  }

  drawRectAround() {
    let coords = this.#determine(
      this.Ax,
      this.Ay,
      this.Bx,
      this.By,
      this.height
    );
    context.beginPath();
    context.moveTo(this.Ax, this.Ay);
    context.lineTo(this.Bx, this.By);
    context.lineTo(this.Bx + coords[0], this.By + coords[1]);
    context.lineTo(this.Ax + coords[0], this.Ay + coords[1]);
    context.lineTo(this.Ax, this.Ay);
    context.fillStyle = this.rectangle_color;
    context.fill();
    context.stroke();
    context.closePath();
  }
}

function drawFigure() {
  const Ax = document.getElementById("Ax").value;
  const Bx = document.getElementById("Bx").value;
  const Ay = document.getElementById("Ay").value;
  const By = document.getElementById("By").value;
  const height = document.getElementById("height").value;

  //   console.log(!isNaN(Ax.value));
  if (
    isNaN(Ax) ||
    isNaN(Bx) ||
    isNaN(Ay) ||
    isNaN(By) ||
    isNaN(height) ||
    Ax === "" ||
    Bx === "" ||
    Ay === "" ||
    By === "" ||
    height === "" ||
    Math.abs(Ax) > 95 ||
    Math.abs(Bx) > 95 ||
    Math.abs(Ay) > 40 ||
    Math.abs(By) > 40 ||
    height <= 0
  ) {
    alert("Non valid input data!");
    return;
  }

  const checkbox = document.getElementById("isRectangleEnabled").checked;

  const triangle_color = document.getElementById("triangle-color").value;
  const rectangle_color = document.getElementById("rectangle-color").value;

  let triangle = new Triangle(
    Ax,
    Ay,
    Bx,
    By,
    height,
    triangle_color,
    rectangle_color
  );
  if (checkbox) triangle.drawRectAround();

  triangle.draw();
  return;
}

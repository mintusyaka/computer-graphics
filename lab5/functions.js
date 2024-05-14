// global variables

let canvas = document.getElementById("_canvas");
let context = canvas.getContext("2d");

let window_height = 700;
let window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

let scale = 1;

let FPS = 25;

let sq = null;

let doAnimation = false;

let slider = document.getElementById("scale")
slider.oninput = function() {
    scale = slider.value / 100.0

    redrawScene();
}

function animateRect() {
    doAnimation = !doAnimation;
    
    window.requestAnimationFrame(animate);

}

function vectorLength(vector) {
    let sumOfSquares = 0;
    for (let i = 0; i < vector.length; i++) {
      sumOfSquares += vector[0][i] * vector[0][i];
    }
    return Math.sqrt(sumOfSquares);
}

function isRectOnEdge() {
    if(sq != null)
    {
        if((Math.abs(sq.get_center()[0][1]) + distance([sq.A[0][0], sq.A[0][1]], [sq.C[0][0], sq.C[0][1]]) / 2) >= window_height / 2 / 10 / scale
    || (Math.abs(sq.get_center()[0][1]) + distance([sq.B[0][0], sq.B[0][1]], [sq.D[0][0], sq.D[0][1]]) / 2) >= window_height / 2 / 10 / scale)
        {
            matrixMove[2][1] *= -1;
            matrixRes = multiplyMatrices(matrixRotate, matrixMove);
        }
    }
}

function animate() {
    if(!doAnimation)
    {
        
    }
    else if(sq == null)
    {
        alert("No rectangle!");
    }
    else
    {
        sq.changePos(matrixRes)
        // sq.changePos(matrixRotate)
        redrawScene()
        isRectOnEdge()

        requestAnimationFrame(animate)

    }
}

function newRectangle() {
    let Ax = parseInt(document.getElementById("pointAx").value)
    let Ay = parseInt(document.getElementById("pointAy").value)
    let Bx = parseInt(document.getElementById("pointBx").value)
    let By = parseInt(document.getElementById("pointBy").value)
    let Cx = parseInt(document.getElementById("pointCx").value)
    let Cy = parseInt(document.getElementById("pointCy").value)
    let Dx = parseInt(document.getElementById("pointDx").value)
    let Dy = parseInt(document.getElementById("pointDy").value)

    if(!isSquare([Ax, Ay], [Bx, By], [Cx, Cy], [Dx, Dy])) {
        alert("It should be square vertex's coordinates!");
        return;
    }
    else {
        
    }


    let colorA = document.getElementById("colorA").value
    let colorB = document.getElementById("colorB").value
    let colorC = document.getElementById("colorC").value
    let colorD = document.getElementById("colorD").value

    console.log([[Ax, Ay, 1]],
        [[Bx, By, 1]],
        [[Cx, Cy, 1]],
        [[Dx, Dy, 1]])

    sq = new Square(
        [[Ax, Ay, 1]],
        [[Bx, By, 1]],
        [[Cx, Cy, 1]],
        [[Dx, Dy, 1]],
        colorA,
        colorB,
        colorC,
        colorD
    )

    redrawScene()
}

function distance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
  
function isSquare(p1, p2, p3, p4) {
    const distances = [
      distance(p1, p2),
      distance(p1, p3),
      distance(p1, p4),
      distance(p2, p3),
      distance(p2, p4),
      distance(p3, p4),
    ];
  
    distances.sort((a, b) => a - b);
  
    const side = distances[0];
    const isValidSquare = (
      distances[0] === distances[1] &&
      distances[1] === distances[2] &&
      distances[2] === distances[3] &&
      distances[4] === distances[5] &&
      distances[4] === Math.sqrt(2) * side
    );
  
    return isValidSquare;
}

function changeScale(newScale) {
    scale = newScale

    redrawScene()
}

function redrawScene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    drawCoords();
    context.closePath();

    if(sq != null)
        sq.draw();
}

function coordsConvert(coords) {
    if(coords.length != 1) {
        console.log(coords[0], coords[1])
        console.log([coords[0] * 10 * scale + window_width / 2, -coords[1] * 10 * scale + window_height / 2, 1]);
        return [coords[0] * 10 * scale + window_width / 2, -coords[1] * 10 * scale + window_height / 2, 1];
    }
    else {
        console.log([coords[0][0] * 10 * scale + window_width / 2, -coords[0][1] * 10 * scale + window_height / 2, 1]);
        return [coords[0][0] * 10 * scale + window_width / 2, -coords[0][1] * 10 * scale + window_height / 2, 1];
    }
}

function drawCoords() {
    context.moveTo(window_width / 2, 0);
    context.lineTo(window_width / 2, window_height);

    context.moveTo(0, window_height / 2);
    context.lineTo(window_width, window_height / 2);
    context.stroke();

    context.font = "12px serif";
    context.fillText(0, window_width / 2 - 12, window_height / 2 + 15);

    for (let i = 0; i < window_width / 2; i += 10 * scale) {
    context.moveTo(window_width / 2 + i, window_height / 2 - 3);
    context.lineTo(window_width / 2 + i, window_height / 2 + 3);
    context.moveTo(window_width / 2 - i, window_height / 2 - 3);
    context.lineTo(window_width / 2 - i, window_height / 2 + 3);

    context.stroke();

    if (parseInt(i / scale) % 50 == 0 && i != 0) {
        context.fillText(parseInt(i / 10 / scale), window_width / 2 - 5 + i, window_height / 2 + 14);
        context.fillText(
        parseInt(-i / 10 / scale),
        window_width / 2 - 10 / scale - i,
        window_height / 2 + 14
        );
    }
    }

    for (let i = 0; i < window_height / 2; i += 10 * scale) {
    context.moveTo(window_width / 2 - 3, window_height / 2 + i);
    context.lineTo(window_width / 2 + 3, window_height / 2 + i);
    context.moveTo(window_width / 2 - 3, window_height / 2 - i);
    context.lineTo(window_width / 2 + 3, window_height / 2 - i);

    context.stroke();
    if (parseInt(i / scale) % 50 == 0 && i != 0) {
        context.fillText(parseInt(-i / 10 / scale), window_width / 2 - 20, window_height / 2 + i + 5);
        context.fillText(parseInt(i / 10 / scale), window_width / 2 - 20, window_height / 2 - i + 5);
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

}

function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;
  
    if (colsA !== rowsB) {
      throw new Error('Матриці не можна множити: кількість стовпців у першій матриці має дорівнювати кількості рядків у другій матриці.');
    }
  
    let result = new Array(rowsA);
    for (let i = 0; i < rowsA; i++) {
      result[i] = new Array(colsB).fill(0);
    }
  
    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        for (let k = 0; k < colsA; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }
  
    return result;
}

function subtractMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;

    console.log(rowsA, colsA, rowsB, colsB)

    if (rowsA !== rowsB || colsA !== colsB) {
      throw new Error('Матриці мають різний розмір.');
    }
  
    let result = new Array(rowsA);
    for (let i = 0; i < rowsA; i++) {
      result[i] = new Array(colsA);
      for (let j = 0; j < colsA; j++) {
        result[i][j] = matrixA[i][j] - matrixB[i][j];
      }
    }

    if(rowsA == 3)
        result[2] = 1;
    else if(rowsA == 1 && colsA == 3)
        result[0][2] = 1;

    return result;
}  

function addMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;

    console.log(rowsA, colsA, rowsB, colsB)

    if (rowsA !== rowsB || colsA !== colsB) {
      throw new Error('Матриці мають різний розмір.');
    }
  
    let result = new Array(rowsA);
    for (let i = 0; i < rowsA; i++) {
      result[i] = new Array(colsA);
      for (let j = 0; j < colsA; j++) {
        result[i][j] = matrixA[i][j] + matrixB[i][j];
      }
    }
    
    if(rowsA == 3)
        result[2] = 1;
    else if(rowsA == 1 && colsA == 3)
        result[0][2] = 1;

    return result;
}  

function downloadFigure() {
    var link = document.createElement('a');
    link.download = 'figure.png';
    link.href = document.getElementById('_canvas').toDataURL()
    link.click();
}

function downloadMatrix(filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
        matrixRes[0].toString() + "\n" +
        matrixRes[1].toString() + "\n" +
        matrixRes[2].toString()
    ));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
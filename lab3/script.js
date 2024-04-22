var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 

canvas.width = window.innerWidth;
canvas.height = 700;

function drawAlgebraicFractal() {
    // Отримуємо контекст малювання на canvas

    let constLimit = parseInt(document.getElementById('const-limit').value);
    let cReal = parseFloat(document.getElementById('c-real').value);
    let cImaginary = parseFloat(document.getElementById('c-imag').value);
    let maxIterations = parseInt(document.getElementById('max-iters').value);
    let scale = parseInt(document.getElementById('scale-val').value);

    let colors = [
        document.getElementById('R-color').checked,
        document.getElementById('G-color').checked,
        document.getElementById('B-color').checked
    ]

    // Функція для розрахунку кольору точки
    function calculateColor(x, y) {
        var zx = parseFloat(x) / scale - canvas.width / (2 * scale);
        var zy = parseFloat(y) / scale - canvas.height / (2 * scale);

        var zxTemp;
        var iteration = 0;
        while (zx * zx + zy * zy < constLimit && iteration <= maxIterations) {
            zxTemp = zx * Math.cos(zx) - zy * Math.sin(zx) + cReal;
            zy = zx * Math.sin(zy) + zy * Math.cos(zx) + cImaginary;
            zx = zxTemp;
            iteration++;
        }

        if (iteration > maxIterations) {
            return '#000000'; // Чорний колір для точок, які не виходять за межі
        } else {
            // Повернення кольору в залежності від ітерації
            return 'rgb(' + colors[0] * (iteration+100)%256 + ',' + colors[1] * (iteration+100)%256 + ',' + colors[2] * (iteration+100)%256 + ')';
        }
        
    }

    // Малюємо фрактал на canvas
    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
            var color = calculateColor(x, y);
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.closePath();

            ctx.fillRect(x, y, 1, 1);
        }
    }
}


function determine(Ax, Ay, Bx, By, length) {
    let px = Ax - Bx;
    let py = Ay - By;
    const len = length / Math.hypot(px, py);
    px *= len;
    py *= len;
    return [-py, px];
}

function drawNewTriangle(points, iters) {
    ctx.beginPath();
    ctx.moveTo(points[2][0], points[2][1]);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[2][0], points[2][1]);
    ctx.lineTo(points[1][0], points[1][1]);
    ctx.strokeStyle = 'black';
    ctx.closePath();
    ctx.stroke();

    recursiveEraseParts(points, iters - 1);
}

function getMiddleCoords(pointA, pointB) {
    return [(pointA[0]+pointB[0])/2, (pointA[1]+pointB[1])/2];
}

function recursiveEraseParts(points, iters) {
    if(iters === 0) return;

    let tempCoords = getMiddleCoords(points[0], points[1]);

    let coords = determine(
        tempCoords[0],
        tempCoords[1],
        points[2][0],
        points[2][1],
        Math.sqrt((points[1][0]-points[0][0])*(points[1][0]-points[0][0])+(points[1][1]-points[0][1])*(points[1][1]-points[0][1]))/30
    );

    //left
    ctx.beginPath();
    // ctx.strokeStyle = 'white';
    // ctx.moveTo(tempCoords[0], tempCoords[1]);
    // ctx.lineTo(
    //     tempCoords[0] + coords[0],
    //     tempCoords[1] + coords[1]
    // );
    ctx.clearRect(tempCoords[0], tempCoords[1], coords[0], coords[1]);
    ctx.closePath();
    // ctx.stroke();
    drawNewTriangle([points[2], points[0], [tempCoords[0] + coords[0], tempCoords[1] + coords[1]]], iters);

    //right
    ctx.beginPath();
    // ctx.strokeStyle = 'white';
    // ctx.moveTo(tempCoords[0], tempCoords[1]);
    // ctx.lineTo(
    //     tempCoords[0] - coords[0],
    //     tempCoords[1] - coords[1]
    // );
    ctx.clearRect(tempCoords[0], tempCoords[1], -coords[0], -coords[1]);
    ctx.closePath();
    // ctx.stroke();
    drawNewTriangle([points[1], points[2], [tempCoords[0] - coords[0], tempCoords[1] - coords[1]]], iters);

    
}

function beginChesaroFractal() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x1 = parseInt(document.getElementById('x1').value);
    let y1 = parseInt(document.getElementById('y1').value);
    let x2 = parseInt(document.getElementById('x2').value);
    let y2 = parseInt(document.getElementById('y2').value);
    let iters = parseInt(document.getElementById('iters-chesaro').value);

    // build triangle
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    let coords = determine(
        x1,
        y1,
        x2,
        y2,
        Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))/2
    );
    ctx.lineTo(
        (x2 + x1) / 2 + coords[0],
        (y2 + y1) / 2 + coords[1]
    );
    ctx.lineTo(x1, y1);
    ctx.closePath();

    ctx.stroke();
    //------------

    recursiveEraseParts([[x1,y1],[x2,y2],[(x2 + x1) / 2 + coords[0],(y2 + y1) / 2 + coords[1]]], iters-1);

}

download_img = function(el) {
    var image = canvas.toDataURL("image/jpg");
    el.href = image;
  };
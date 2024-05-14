
drawCoords();

let alpha = Math.PI / 20;

let matrixMove = [
    [1, 0, 0],
    [0, 1, 0],
    [0, -0.5, 1]
  ];

let matrixRotate = [
    [Math.cos(alpha), Math.sin(alpha), 0],
    [-Math.sin(alpha), Math.cos(alpha), 0],
    [0,0,1]
]

let matrixScale = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]

let matrixRes = multiplyMatrices(matrixMove, matrixRotate);

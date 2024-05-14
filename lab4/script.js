const canvas = document.getElementById('canvasImg');
const context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

let checkedPixel = [0,0];
let curColorModel = 'rgb';

let zoneCoords = [[-1,-1],[-1,-1]];

function changeColor() {
    if(curColorModel === 'rgb') {
        const _colorHSB = [
            document.getElementById('_hue').value,
            document.getElementById('_saturation').value,
            document.getElementById('_brightness').value
        ];

        const _newColorRGB = [
            document.getElementById('_red').value,
            document.getElementById('_green').value,
            document.getElementById('_blue').value
        ]

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let x = 0;
        let y = 0;
        for (let i = 0; i < data.length; i += 4) {
            let _pixel = makePixelHSB(
                [
                    data[i],
                    data[i + 1],
                    data[i + 2]
                ]
            );

            if(_pixel[0] == _colorHSB[0] &&
                _pixel[1] == _colorHSB[1] &&
                _pixel[2] == _colorHSB[2]
            ) {
                _pixel = _newColorRGB;
                drawPix(x, y, _newColorRGB);
            }



            if(x == canvas.width - 1) {
                x = 0;
                ++y;
            }
            else x++;

        }

    } else {
        const _newColorHSB = [
            document.getElementById('_hue').value,
            document.getElementById('_saturation').value,
            document.getElementById('_brightness').value
        ];

        const _colorRGB = [
            document.getElementById('_red').value,
            document.getElementById('_green').value,
            document.getElementById('_blue').value
        ]

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let x = 0;
        let y = 0;
        for (let i = 0; i < data.length; i += 4) {
            let _pixel =
                [
                    data[i],
                    data[i + 1],
                    data[i + 2]
                ]

            if(_pixel[0] == _colorRGB[0] &&
                _pixel[1] == _colorRGB[1] &&
                _pixel[2] == _colorRGB[2]
            ) {
                _pixel = _newColorHSB;
                drawPix(x, y, makePixelRGB(_pixel));
            }



            if(x == canvas.width - 1) {
                x = 0;
                ++y;
            }
            else x++;

        }
    }
}

function changeBrightness() {
    if(zoneCoords[1][0] == -1) {
        alert('Оберіть зону для зміни кольору!');
        return;
    }

    let newBrightness = document.getElementById('_change-brightness').value;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let x = 0;
        let y = 0;
        for (let i = 0; i < data.length; i += 4) {
            let _pixelHSB = makePixelHSB(
                [
                    data[i],
                    data[i + 1],
                    data[i + 2]
                ]
            );

            if(_pixelHSB[0] >= 90 && _pixelHSB[0] <= 150 &&
                (x >= zoneCoords[0][0] && y >= zoneCoords[0][1] &&
                x <= zoneCoords[1][0] && y <= zoneCoords[1][1])
            ) {
                _pixelHSB[2] = newBrightness;
            }

            drawPix(x, y, makePixelRGB(_pixelHSB));


            if(x == canvas.width - 1) {
                x = 0;
                ++y;
            }
            else x++;

        }

}

function pick(event) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;

    if(zoneCoords[0][0] == -1) {
        zoneCoords[0][0] = x;
        zoneCoords[0][1] = y;
    }
    else if (zoneCoords[1][0] == -1){    
        zoneCoords[1][0] = x;
        zoneCoords[1][1] = y;
    } else {
        zoneCoords[0][0] = -1;
        zoneCoords[0][1] = -1;
        zoneCoords[1][0] = -1;
        zoneCoords[1][1] = -1;
    }

    writeFields(x, y);
}

function writeFields(x, y) {
    writeFieldsRGB(x, y);
    writeFieldsHSL(x, y);

    let x1 = document.getElementById('_x1');
    let y1 = document.getElementById('_y1');
    let x2 = document.getElementById('_x2');
    let y2 = document.getElementById('_y2');

    x1.value = zoneCoords[0][0];
    y1.value = zoneCoords[0][1];
    x2.value = zoneCoords[1][0];
    y2.value = zoneCoords[1][1];
}

function writeFieldsRGB(x, y) {
    let red = document.getElementById('_red');
    let green = document.getElementById('_green');
    let blue = document.getElementById('_blue');

    const color = getPixelRGB(x, y);

    red.value = color[0];
    green.value = color[1];
    blue.value = color[2];
}

function writeFieldsHSL(x, y) {
    let hue = document.getElementById('_hue');
    let saturation = document.getElementById('_saturation');
    let brightness = document.getElementById('_brightness');

    const color = makePixelHSB(getPixelRGB(x, y));

    hue.value = color[0];
    saturation.value = color[1];
    brightness.value = color[2];
}

function drawPix(x, y, fillArr) {
    fill = "rgb("+fillArr.join()+")";
    // + fillArr[0] + ','
    // + Math.abs(fillArr[1] - 1) + ','
    // + Math.abs(fillArr[2] - 1)
    // + ")";
    context.beginPath();
    context.rect(x, y, 1, 1);
    context.fillStyle = fill;
    context.fill();
}

function updateColorModel() {
    var radios = document.getElementsByTagName('input');
    var value;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            value = radios[i].value;       
        }
    }
    if(value === 'rgb') {
        curColorModel = 'rgb';
    }
    else {
        curColorModel = 'hsb';

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let x = 0;
        let y = 0;
        for (let i = 0; i < data.length; i += 4) {
            let _pixelHSB = makePixelHSB(
                [
                    data[i],
                    data[i + 1],
                    data[i + 2]
                ]
            );

            drawPix(x, y, makePixelRGB(_pixelHSB));

            if(x == canvas.width - 1) {
                x = 0;
                ++y;
            }
            else x++;

        }
        // context.putImageData(imageData, 0, 0);
    }
}

function readImage(input) {
   
    context.clearRect(0, 0, canvas.width, canvas.height);
    let imgSrc = '';
    if (input.value !== '') {
      imgSrc = window.URL.createObjectURL(input.files[0]);
    }
    const img = new Image();
    img.src = imgSrc;
    img.onload = function() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function getPixelRGB(pixX, pixY) {
    const coord = pixY * canvas.width * 4 + pixX * 4;
    const img_data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    return [
        img_data[coord],
        img_data[coord + 1],
        img_data[coord + 2]
    ];
}

function makePixelHSB(_pixelRGB) {
    let pixelRGB = [
        _pixelRGB[0] / 255.0,
        _pixelRGB[1] / 255.0,
        _pixelRGB[2] / 255.0
    ]

    let V = Math.max(pixelRGB[0], pixelRGB[1], pixelRGB[2]) * 1.0;
    let min = Math.min(pixelRGB[0], pixelRGB[1], pixelRGB[2]) * 1.0;
    
    let S = 0;
    if(V != 0)
        S = (V - min) / V;

    let H = 60;
    switch (V) {
        case pixelRGB[0]:
            H *= (pixelRGB[1] - pixelRGB[2]) / (V - min);
            break;
        case pixelRGB[1]:
            H *= 2 + (pixelRGB[2] - pixelRGB[0]) / (V - min);
            break;
        case pixelRGB[2]:
            H *= 4 + (pixelRGB[0] - pixelRGB[1]) / (V - min);
            break;
    }

    if(H < 0)
        H += 360;

    return [
        H,
        S,
        V
    ];
}

function makePixelRGB(_pixelHSB) {
    let C = _pixelHSB[2] * _pixelHSB[1];
    let X = C * (1 - Math.abs((_pixelHSB[0] / 60) % 2 - 1));
    let m = _pixelHSB[2] - C;

    let R, G, B;
    if(_pixelHSB[0] < 60) {
        R = C;
        G = X;
        B = 0;

    } else if (_pixelHSB[0] < 120) {
        R = X;
        G = C;
        B = 0;

    } else if(_pixelHSB[0] < 180) {
        R = 0;
        G = C;
        B = X;

    } else if(_pixelHSB[0] < 240) {
        R = 0;
        G = X;
        B = C;

    } else if(_pixelHSB[0] < 300) {
        R = X;
        G = 0;
        B = C;

    } else {
        R = C;
        G = 0;
        B = X;
    }

    return [
        (R+m)*255,
        (G+m)*255,
        (B+m)*255
    ];


}

canvas.addEventListener("click", (event) => pick(event));

download_img = function(el) {
    var image = canvas.toDataURL("image/jpg");
    el.href = image;
  };
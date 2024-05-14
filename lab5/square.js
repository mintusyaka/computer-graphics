class Square {

    _sq_center = [0, 0, 1];

    constructor(A, B, C, D, colorA, colorB, colorC, colorD)
    {
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;

        this.colorA = colorA;
        this.colorB = colorB;
        this.colorC = colorC;
        this.colorD = colorD;



        this._sq_center = [[
            (this.#getX(this.A) + this.#getX(this.C)) / 2,
            (this.#getY(this.A) + this.#getY(this.C)) / 2,
            1
        ]]
    }

    draw()
    {
        context.moveTo(coordsConvert(this.A)[0], coordsConvert(this.A)[1]);
        context.lineTo(coordsConvert(this.B)[0], coordsConvert(this.B)[1]);
        context.lineTo(coordsConvert(this.C)[0], coordsConvert(this.C)[1]);
        context.lineTo(coordsConvert(this.D)[0], coordsConvert(this.D)[1]);
        context.lineTo(coordsConvert(this.A)[0], coordsConvert(this.A)[1]);
        // context.lineTo(coordsConvert(this._sq_center)[0], coordsConvert(this._sq_center)[1]);
        context.stroke();

        context.beginPath();
        context.fillStyle = this.colorA;
        context.arc(coordsConvert(this.A)[0], coordsConvert(this.A)[1], 3, 0, 2*Math.PI);
        context.fill();
        context.fillStyle = "black";
        context.closePath();

        context.beginPath();
        context.fillStyle = this.colorB;
        context.arc(coordsConvert(this.B)[0], coordsConvert(this.B)[1], 3, 0, 2*Math.PI);
        context.fill();
        context.fillStyle = "black";
        context.closePath();

        context.beginPath();
        context.fillStyle = this.colorC;
        context.arc(coordsConvert(this.C)[0], coordsConvert(this.C)[1], 3, 0, 2*Math.PI);
        context.fill();
        context.fillStyle = "black";
        context.closePath();

        context.beginPath();
        context.fillStyle = this.colorD;
        context.arc(coordsConvert(this.D)[0], coordsConvert(this.D)[1], 3, 0, 2*Math.PI);
        context.fill();
        context.fillStyle = "black";
        context.closePath();

        
    }
    
    #getX(point) {
        if(point.length != 1) {
            return point[0]
        }
        else {
            return point[0][0]
        }
    }
    
    #getY(point) {
        if(point.length != 1) {
            return point[1]
        }
        else {
            return point[0][1]
        }
    }

    changePos(matrix) {
        this.A = (
            addMatrices(
                multiplyMatrices(subtractMatrices(this.A, this._sq_center), matrix),
                this._sq_center
            )
        );
        this.B = (
            addMatrices(
                multiplyMatrices(subtractMatrices(this.B, this._sq_center), matrix),
                this._sq_center
            )
        );
        this.C = (
            addMatrices(
                multiplyMatrices(subtractMatrices(this.C, this._sq_center), matrix),
                this._sq_center
            )
        );
        this.D = (
            addMatrices(
                multiplyMatrices(subtractMatrices(this.D, this._sq_center), matrix),
                this._sq_center
            )
        );

        this._sq_center = [[
            (this.#getX(this.A) + this.#getX(this.C)) / 2,
            (this.#getY(this.A) + this.#getY(this.C)) / 2,
            1
        ]]
    }

    get_center() {
        return this._sq_center;
    }

}
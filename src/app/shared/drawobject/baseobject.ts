
export class BaseObject {

    X: number;
    Y: number;
    Width: number;
    Height: number;
    FillColor: string;
    YesSelected: boolean;
    YesMouseOver : boolean;
    X1: number;
    X2: number;
    Y1: number;
    Y2: number;
    ctx : CanvasRenderingContext2D;
    canvas : HTMLCanvasElement;


    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    Draw() {}

    CheckMouseOver(X: number, Y: number): boolean {
        return false;
    }

}


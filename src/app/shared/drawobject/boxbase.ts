import { BaseObject } from "./baseobject";

export class BoxBase extends BaseObject {

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    constructor(context) {
        super(context);

        this.X = 10;
        this.Y = 10;
        this.Width = 100;
        this.Height = 100;
        this.FillColor = 'lightgreen';
    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    Draw() {
        this.ctx.fillStyle = this.FillColor;
        this.ctx.fillRect(this.X, this.Y, this.Width, this.Height);

        if (this.YesMouseOver){
            this.DrawMouseOver();
        }
    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    private DrawMouseOver(){

        // this.ctx.setLineDash([0, 0]);
        // this.ctx.fillStyle = this.mouseOverColor;
        // this.ctx.strokeStyle = this.mouseOverBorder;
        // this.ctx.lineWidth = 1;

        // this.ctx.beginPath();
        // this.ctx.arc(this.x1(), this.y1(), this.r, 0, 2 * Math.PI, false);
        // this.ctx.fill();
        // this.ctx.stroke();

        // this.ctx.beginPath();
        // this.ctx.arc(this.x2(), this.y2(), this.r, 0, 2 * Math.PI, false);
        // this.ctx.fill();
        // this.ctx.stroke();

        // this.ctx.beginPath();
        // this.ctx.arc(this.x3(), this.y3(), this.r, 0, 2 * Math.PI, false);
        // this.ctx.fill();
        // this.ctx.stroke();

        // this.ctx.beginPath();
        // this.ctx.arc(this.x4(), this.y4(), this.r, 0, 2 * Math.PI, false);
        // this.ctx.fill();
        // this.ctx.stroke();

    }
    


    CheckMouseOver(X: number, Y: number): boolean {
        return false;
    }

    

}
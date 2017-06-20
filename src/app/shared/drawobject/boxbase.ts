import { BaseObject } from "./baseobject";

export class BoxBase extends BaseObject {

    mover_x1 : number;
    mover_y1 : number;
    mover_x2 : number;
    mover_y2 : number;
    mover_x3 : number;
    mover_y3 : number;
    mover_x4 : number;
    mover_y4 : number;

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
        
        // this.ctx.fillStyle = this.FillColor;
        // this.ctx.fillRect(this.X, this.Y, this.Width, this.Height);

        this.ctx.beginPath();
        this.ctx.setLineDash([0,0]);
        this.ctx.rect(this.X, this.Y, this.Width, this.Height);
        this.ctx.fillStyle = 'lightblue';
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'gray';
        this.ctx.fill();
        this.ctx.stroke();


        if (this.YesMouseOver){
            this.DrawMouseOver();
        }
    }

    private CalMouseOverCirclePoint()
    {
        this.mover_x1 = this.X;
        this.mover_y1 = this.Y + (this.Height / 2);

        this.mover_x2 = this.X + (this.Width / 2);
        this.mover_y2 = this.Y;

        this.mover_x3 = this.X + this.Width;
        this.mover_y3 = this.Y + (this.Height / 2);

        this.mover_x4 = this.X + (this.Width / 2);
        this.mover_y4 = this.Y + this.Height;
    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    private DrawMouseOver(){

        this.CalMouseOverCirclePoint();

        const r = 8;

        this.ctx.setLineDash([0, 0]);
        this.ctx.fillStyle = 'lightpink';
        this.ctx.strokeStyle = 'gray';
        this.ctx.lineWidth = 1;

        this.ctx.beginPath();
        this.ctx.arc(this.mover_x1, this.mover_y1, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.mover_x2, this.mover_y2, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.mover_x3, this.mover_y3, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.mover_x4, this.mover_y4, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();

    }

    CheckMouseOver(X: number, Y: number): boolean {

        if (
            this.X < X && (this.X + this.Width) > X  &&
            this.Y < Y && (this.Y + this.Height) > Y  
        )
        {
            this.YesMouseOver = true;
            return true;
        }
        else{
            this.YesMouseOver = false;
            return false;
        }

    }

    

}
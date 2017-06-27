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

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    private CalMouseOverCirclePoint()
    {

        let mover_x1 : number;
        let mover_y1 : number;
        let mover_x2 : number;
        let mover_y2 : number;
        let mover_x3 : number;
        let mover_y3 : number;
        let mover_x4 : number;
        let mover_y4 : number;

        mover_x1 = this.X;
        mover_y1 = this.Y + (this.Height / 2);

        mover_x2 = this.X + (this.Width / 2);
        mover_y2 = this.Y;

        mover_x3 = this.X + this.Width;
        mover_y3 = this.Y + (this.Height / 2);

        mover_x4 = this.X + (this.Width / 2);
        mover_y4 = this.Y + this.Height;

        return {mover_x1, mover_x2, mover_x3, mover_x4, mover_y1, mover_y2, mover_y3, mover_y4};

    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    private DrawMouseOver(){

        let mop = this.CalMouseOverCirclePoint();

        const r = 10;

        this.ctx.setLineDash([0, 0]);
        this.ctx.fillStyle = 'lightpink';
        this.ctx.strokeStyle = 'gray';
        this.ctx.lineWidth = 1;

        this.ctx.beginPath();
        this.ctx.arc(mop.mover_x1, mop.mover_y1, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(mop.mover_x2, mop.mover_y2, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(mop.mover_x3, mop.mover_y3, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(mop.mover_x4, mop.mover_y4, r, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();
    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    CheckMouseOver(X: number, Y: number): boolean {


        if (this.CheckMouseCircleOver(X,Y) != 0)
        {
            this.YesMouseOver = true;
            return true;
        }
        else if (
            this.X < X && (this.X + this.Width) > X  &&
            this.Y < Y && (this.Y + this.Height) > Y  
        )
        {
            this.CheckMouseCircleOver(X,Y);
            this.YesMouseOver = true;
            return true;
        }
        else{
            this.YesMouseOver = false;
            return false;
        }

    }


    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    CheckMouseCircleOver(x:number, y : number) : number {

        let mop = this.CalMouseOverCirclePoint();

        const r = 10;


        this.ctx.beginPath();
        this.ctx.arc(mop.mover_x1, mop.mover_y1, r, 0, 2 * Math.PI, false);
        if (this.ctx.isPointInPath(x,y)){
            return 1;
        }
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(mop.mover_x2, mop.mover_y2, r, 0, 2 * Math.PI, false);
        if (this.ctx.isPointInPath(x,y)){
            return 2;
        }
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(mop.mover_x3, mop.mover_y3, r, 0, 2 * Math.PI, false);
        if (this.ctx.isPointInPath(x,y)){
            return 3;
        }
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(mop.mover_x4, mop.mover_y4, r, 0, 2 * Math.PI, false);
        if (this.ctx.isPointInPath(x,y)){
            return 4;
        }
        this.ctx.closePath();

        return -1;

    }


    

}//class
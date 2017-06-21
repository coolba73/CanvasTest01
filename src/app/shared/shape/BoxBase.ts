import { BaseObject } from "./BaseObject";

export class BoxBase extends BaseObject{

    /*
    ############################################################################################################################
    
    FunctionName
    
    ############################################################################################################################
    */
    x : number;
    y : number;
    Width : number;
    Height : number;

    
    FillColor : string;
    LineColor : string;

    private mover_x1 : number;
    private mover_y1 : number;
    private mover_x2 : number;
    private mover_y2 : number;
    private mover_x3 : number;
    private mover_y3 : number;
    private mover_x4 : number;
    private mover_y4 : number;


    /*
    ############################################################################################################################
    
    constructor
    
    ############################################################################################################################
    */
    constructor(){
        super();

        this.FillColor = 'white';
        this.LineColor = 'gray';

    }

    /*
    ############################################################################################################################
    
    Draw
    
    ############################################################################################################################
    */
    Draw(ctx:CanvasRenderingContext2D){

        ctx.beginPath();
        ctx.setLineDash([0,0]);
        ctx.rect(this.x, this.y, this.Width, this.Height);
        ctx.fillStyle = this.FillColor;
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.LineColor;
        ctx.fill();
        ctx.stroke();

        if(this.YesMouseOver)
        {
            this.DrawMouseOver(ctx);
        }

    }

    /*
    ############################################################################################################################
    
    CalMouseOverCirclePoint
    
    ############################################################################################################################
    */
    private CalMouseOverCirclePoint()
    {
        this.mover_x1 = this.x;
        this.mover_y1 = this.y + (this.Height / 2);

        this.mover_x2 = this.x + (this.Width / 2);
        this.mover_y2 = this.y;

        this.mover_x3 = this.x + this.Width;
        this.mover_y3 = this.y + (this.Height / 2);

        this.mover_x4 = this.x + (this.Width / 2);
        this.mover_y4 = this.y + this.Height;
    }

    /*
    ############################################################################################################################
    
    DrawMouseOver
    
    ############################################################################################################################
    */
    private DrawMouseOver(ctx:CanvasRenderingContext2D){

        this.CalMouseOverCirclePoint();

        const r = 8;

        ctx.setLineDash([0, 0]);
        ctx.fillStyle = 'lightpink';
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(this.mover_x1, this.mover_y1, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.mover_x2, this.mover_y2, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.mover_x3, this.mover_y3, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.mover_x4, this.mover_y4, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

    }

    /*
    ############################################################################################################################
    
    CheckMouseOver
    
    ############################################################################################################################
    */
    CheckMouseOver(x:number, y:number) : boolean {
         if (
            this.x < x && (this.x + this.Width) > x  &&
            this.y < y && (this.y + this.Height) > y  
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


}//class
import { BaseObject } from "./BaseObject";
import { BoxBase } from "./BoxBase";

export class LineBase extends BaseObject{

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    x1:number;
    x2:number;
    y1:number;
    y2:number;

    Box_1_ID:string;
    Box_2_ID:string;

    Box_1_PointIndex : number;
    Box_2_PointIndex : number;

    LineColor : string = 'black';
    ArrowFillColor : string = 'lightblue';

    YesDrawEndArrow : boolean


    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    constructor(){
        super();
        this.Type = LineBase.name;
    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    Draw(ctx:CanvasRenderingContext2D){

        ctx.beginPath();
        ctx.setLineDash([0, 0]);
        ctx.strokeStyle = this.LineColor;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineWidth = 1;
        ctx.stroke();

        // this.DrawArror(ctx,'end');

        if (this.YesDrawEndArrow)
            this.DrawArrow2(ctx);

    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    DrawArrow1(ctx:CanvasRenderingContext2D, where:string)
    {
        let from_x : number;
        let from_y : number;
        let to_x : number;
        let to_y : number;
        let r : number = 10;

        if(where === 'start'){

            from_x = this.x2;
            from_y = this.y2;
            to_x = this.x1;
            to_y = this.y1;

        }
        else if(where === 'end'){

            from_x = this.x1;
            from_y = this.y1;
            to_x = this.x2;
            to_y = this.y2;

        }

        var x_center = to_x;
        var y_center = to_y;
        
        var angle;
        var x;
        var y;
        
        ctx.beginPath();
        
        angle = Math.atan2(to_y-from_y,to_x-from_x)
        x = r*Math.cos(angle) + x_center;
        y = r*Math.sin(angle) + y_center;

        ctx.moveTo(x, y);
        
        angle += (1/3)*(2*Math.PI)
        x = r*Math.cos(angle) + x_center;
        y = r*Math.sin(angle) + y_center;
        
        ctx.lineTo(x, y);
        
        angle += (1/3)*(2*Math.PI)
        x = r*Math.cos(angle) + x_center;
        y = r*Math.sin(angle) + y_center;
        
        ctx.lineTo(x, y);
        
        ctx.closePath();
        ctx.fillStyle = this.LineColor;
        ctx.fill();

        
    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    DrawArrow2(ctx:CanvasRenderingContext2D)
    {
        ctx.save();

        let from_x : number;
        let from_y : number;
        let to_x : number;
        let to_y : number;
        let size : number = 10;

        from_x = this.x1;
        from_y = this.y1;
        to_x = this.x2;
        to_y = this.y2;

        let dx = to_x - from_x;
        let dy = to_y - from_y;
        let len = Math.sqrt(dx*dy+dy*dy);
        ctx.translate(to_x,to_y);
        ctx.rotate(Math.atan2(dy,dx));

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(-size, -size);
        ctx.lineTo(-size, size);
        ctx.closePath();
        ctx.fillStyle = this.LineColor;
        ctx.fill();

        ctx.restore();

    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    SetBoxPoint(box:BoxBase, boxIndex:number){

        let circlePoint = box.CalMouseOverCirclePoint();

        if (boxIndex === 1){
            switch(this.Box_1_PointIndex)
            {
                case 1:{
                    this.x1 = circlePoint.mover_x1;
                    this.y1 = circlePoint.mover_y1;
                    break;
                }
                case 2:{
                    this.x1 = circlePoint.mover_x2;
                    this.y1 = circlePoint.mover_y2;
                    break;
                }
                case 3:{
                    this.x1 = circlePoint.mover_x3;
                    this.y1 = circlePoint.mover_y3;
                    break;
                }
                case 4:{
                    this.x1 = circlePoint.mover_x4;
                    this.y1 = circlePoint.mover_y4;
                    break;
                }
            }
        }
        else if (boxIndex === 2){
            switch(this.Box_2_PointIndex)
            {
                case 1:{
                    this.x2 = circlePoint.mover_x1;
                    this.y2 = circlePoint.mover_y1;
                    break;
                }
                case 2:{
                    this.x2 = circlePoint.mover_x2;
                    this.y2 = circlePoint.mover_y2;
                    break;
                }
                case 3:{
                    this.x2 = circlePoint.mover_x3;
                    this.y2 = circlePoint.mover_y3;
                    break;
                }
                case 4:{
                    this.x2 = circlePoint.mover_x4;
                    this.y2 = circlePoint.mover_y4;
                    break;
                }
            }
        }

    }

}//class
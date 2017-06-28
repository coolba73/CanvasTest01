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
        ctx.stroke();

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
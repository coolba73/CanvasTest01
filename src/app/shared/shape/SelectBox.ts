import { BaseObject } from "./BaseObject";

export class SelectBox extends BaseObject{

    x1 : number;
    x2 : number;
    y1 : number;
    y2 : number;

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    constructor(){
        super();
        this.Type = SelectBox.name;
    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    Draw(ctx:CanvasRenderingContext2D){

        let width = Math.abs(this.x1 - this.x2);
        let hegith = Math.abs(this.y1 - this.y2);

        let x = Math.min(this.x1, this.x2);
        let y = Math.min(this.y1, this.y2);

        ctx.beginPath();
        ctx.setLineDash([1,1]);
        ctx.rect(x,y, width, hegith);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'gray';
        //ctx.fill();
        ctx.stroke();

    }

    

}//class
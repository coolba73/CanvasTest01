import { BaseObject } from "./BaseObject";

export class SelectBox extends BaseObject{

    x1 : number;
    x2 : number;
    y1 : number;
    y2 : number;

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    constructor(){
        super();
    }

    //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
    Draw(ctx:CanvasRenderingContext2D){

        let width = Math.abs(this.x1 - this.x2);
        let hegith = Math.abs(this.y1 - this.y2);

        ctx.beginPath();
        // ctx.setLineDash([0,0]);
        ctx.setLineDash([1,1]);
        ctx.rect(this.x1, this.y1, width, hegith);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'lightblue';
        ctx.fill();
        ctx.stroke();
        
    }

    

}//class
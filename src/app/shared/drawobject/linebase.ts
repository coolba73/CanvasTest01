import { BaseObject } from "./baseobject";

export class LineBase extends BaseObject{

    constructor(context){
        super(context);
    }

    Draw(){
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.X1, this.Y1);
        this.ctx.lineTo(this.X2, this.Y2);
        this.ctx.stroke();
        
    }

}
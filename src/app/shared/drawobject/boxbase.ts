
import * as Base from './baseobject';

export class BoxBase extends Base.BaseObject{

    constructor(){
        super();

        this.x = 10;
        this.y = 10;
        this.width = 100;
        this.height = 100;
    }

    Draw(ctx){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
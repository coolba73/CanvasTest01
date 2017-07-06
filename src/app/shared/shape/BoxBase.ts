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
    r : number = 8;
    
    FillColor : string;
    LineColor : string;
    LineDash : number[] = [0,0];
    TextColor : string = "black";
    FonstSize : number = 12;

    Seq : number = 0;

    /*
    ############################################################################################################################
    
    constructor
    
    ############################################################################################################################
    */
    constructor(){

        super();
        this.FillColor = 'white';
        this.LineColor = 'black';
        this.Type = BoxBase.name;
    }

    /*
    ############################################################################################################################
    
    Draw
    
    ############################################################################################################################
    */
    Draw(ctx:CanvasRenderingContext2D){

        ctx.save();

        ctx.beginPath();
        // ctx.setLineDash([0,0]);
        ctx.setLineDash(this.LineDash);
        ctx.rect(this.x, this.y, this.Width, this.Height);
        ctx.fillStyle = this.FillColor;
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.LineColor;

        ctx.stroke();
        
        ctx.shadowColor = '#999';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;

        ctx.fill();
        

        ctx.restore();
        

        //-------------------------------------
        // Draw Select
        //-------------------------------------
        if(this.YesSelected)
        {
            let gap : number = 5;
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 3]);
            ctx.strokeStyle = "red";
            ctx.rect(this.x - gap, this.y - gap, this.Width + (gap*2), this.Height + (gap*2));
            ctx.stroke();
        }

        //-------------------------------------
        // Draw Title
        //-------------------------------------
        ctx.fillStyle = this.TextColor;
        ctx.font =  this.FonstSize.toString() +  "px Arial";
        let txt_width = ctx.measureText(this.Title).width;
        let text_x = this.x + (this.Width / 2) - ( txt_width/2  );
        let text_y = this.y + (this.Height /2) + ( this.FonstSize  / 2 );
        ctx.fillText(this.Title, text_x, text_y);

        if(this.YesMouseOver)
        {
            this.DrawMouseOver(ctx);
        }

        //-------------------------------------
        // Draw Seq
        //-------------------------------------
        ctx.fillStyle = this.TextColor;
        ctx.fillText(this.Seq.toString(), this.x, this.y-10);

    }



    /*
    ############################################################################################################################
    
    CalMouseOverCirclePoint
    
    ############################################################################################################################
    */
    CalMouseOverCirclePoint()
    {

        let mover_x1 : number;
        let mover_y1 : number;
        let mover_x2 : number;
        let mover_y2 : number;
        let mover_x3 : number;
        let mover_y3 : number;
        let mover_x4 : number;
        let mover_y4 : number;

        mover_x1 = this.x;
        mover_y1 = this.y + (this.Height / 2);

        mover_x2 = this.x + (this.Width / 2);
        mover_y2 = this.y;

        mover_x3 = this.x + this.Width;
        mover_y3 = this.y + (this.Height / 2);

        mover_x4 = this.x + (this.Width / 2);
        mover_y4 = this.y + this.Height;

        return {mover_x1, mover_x2, mover_x3, mover_x4, mover_y1, mover_y2, mover_y3, mover_y4};

    }

    /*
    ############################################################################################################################
    
    DrawMouseOver
    
    ############################################################################################################################
    */
    private DrawMouseOver(ctx:CanvasRenderingContext2D){

        let mp = this.CalMouseOverCirclePoint();


        ctx.setLineDash([0, 0]);
        ctx.fillStyle = 'lightpink';
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(mp.mover_x1, mp.mover_y1, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mp.mover_x2, mp.mover_y2, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mp.mover_x3, mp.mover_y3, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mp.mover_x4, mp.mover_y4, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

    }

    /*
    ############################################################################################################################
    
    CheckCircleMouseOver
    
    ############################################################################################################################
    */
    CheckCircleMouseOver(ctx:CanvasRenderingContext2D , x:number, y:number){

        let mp = this.CalMouseOverCirclePoint();

        ctx.beginPath();
        ctx.arc(mp.mover_x1, mp.mover_y1, this.r, 0, 2 * Math.PI, false);
        if ( ctx.isPointInPath(x,y)) return {x:mp.mover_x1, y:mp.mover_y1, PointIndex: 1};
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(mp.mover_x2, mp.mover_y2, this.r, 0, 2 * Math.PI, false);
        if ( ctx.isPointInPath(x,y)) return {x:mp.mover_x2, y:mp.mover_y2, PointIndex: 2};
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(mp.mover_x3, mp.mover_y3, this.r, 0, 2 * Math.PI, false);
        if ( ctx.isPointInPath(x,y)) return {x:mp.mover_x3, y:mp.mover_y3, PointIndex: 3};
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(mp.mover_x4, mp.mover_y4, this.r, 0, 2 * Math.PI, false);
        if ( ctx.isPointInPath(x,y)) return {x:mp.mover_x4, y:mp.mover_y4, PointIndex: 4};
        ctx.closePath();

        return {x:-1, y:-1, PointIndex:-1 };

    }

    /*
    ############################################################################################################################
    
    CheckMouseOver
    
    ############################################################################################################################
    */
    CheckMouseOver( ctx:CanvasRenderingContext2D , x:number, y:number) : boolean {

        if (this.CheckCircleMouseOver(ctx, x,y).x > 0)
        {
            this.YesMouseOver = true;
            return true;
        }
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

    /*
    ############################################################################################################################
    
    CheckSelect
    
    ############################################################################################################################
    */
    CheckSelect(x1:number,y1:number, x2:number, y2:number):boolean{
        
        this.YesSelected = false;

        let mx1 = Math.min(x1,x2);
        let my1 = Math.min(y1,y2);
        let mx2 = Math.max(x1,x2);
        let my2 = Math.max(y1,y2);

        if ( 
            this.x > mx1 &&
            this.y > my1 &&
            this.x + this.Width < mx2 &&
            this.y + this.Height < my2
        )
        {
            this.YesSelected = true;
        }

        return this.YesSelected;

    }

    /*
    ############################################################################################################################
    
    GetCirclePointIndex
    
    ############################################################################################################################
    */
    GetConnectPoint(ctx:CanvasRenderingContext2D , x:number,y:number) {
         
         let ccm = this.CheckCircleMouseOver(ctx,x,y);

         if (ccm.PointIndex > 0){ 
            return ccm;
         }
         else if( this.CheckMouseOver(ctx,x,y)){

             type tmpType = { id : number, value:number, x:number, y:number, PointIndex:number};
             let re : tmpType[] = [];
             let mp = this.CalMouseOverCirclePoint();
 
             re.push({ id : 1, value : Math.pow(x-mp.mover_x1,2) + Math.pow(y-mp.mover_y1,2), x: mp.mover_x1 , y:mp.mover_y1, PointIndex : 1} );
             re.push({ id : 2, value : Math.pow(x-mp.mover_x2,2) + Math.pow(y-mp.mover_y2,2), x: mp.mover_x2 , y:mp.mover_y2, PointIndex : 2} );
             re.push({ id : 3, value : Math.pow(x-mp.mover_x3,2) + Math.pow(y-mp.mover_y3,2), x: mp.mover_x3 , y:mp.mover_y3, PointIndex : 3} );
             re.push({ id : 4, value : Math.pow(x-mp.mover_x4,2) + Math.pow(y-mp.mover_y4,2), x: mp.mover_x4 , y:mp.mover_y4, PointIndex : 4} );
 
             let reType = re.reduce( (a:tmpType,b:tmpType) : tmpType => a.value < b.value ? a:b );

             return {x:reType.x, y:reType.y, PointIndex:reType.PointIndex};

         }

         return {x:-1, y:-1, PointIndex:-1 };   
         
    }

}//class
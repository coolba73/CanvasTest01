import { Component, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairWise';
import 'rxjs/add/operator/switchMap';
import { BaseObject } from "./shared/shape/BaseObject";
import { BoxBase } from "./shared/shape/BoxBase";

@Component({
    templateUrl : './canvas01.component.html',
    selector:'app-root'
})
export class Canvas01Component{

    /*
    ############################################################################################################################
    
    Variables
    
    ############################################################################################################################
    */

    @ViewChild("myCanvas") myCanvasRef : ElementRef;

    pre_x : number;
    pre_y : number;
    currentObj : BaseObject;

    myCanvas : HTMLCanvasElement;
    ctx : CanvasRenderingContext2D;

    objects : BaseObject[] = [];

    message : string = '';
    xpoint : number;
    ypoint : number;

    YesMouseDown : boolean = false;


    /*
    ############################################################################################################################
    
    ngAfterViewInit
    
    ############################################################################################################################
    */
    ngAfterViewInit(){
        
        this.ctx = this.myCanvasRef.nativeElement.getContext("2d");
        this.myCanvas = <HTMLCanvasElement>this.myCanvasRef.nativeElement;

        this.captureEvents(this.myCanvas);

    }

    /*
    ############################################################################################################################
    
    captureEvents
    
    ############################################################################################################################
    */
    captureEvents(canvasEl:HTMLCanvasElement){
        
        let rect = canvasEl.getBoundingClientRect();

        Observable.fromEvent(canvasEl,'mousemove').subscribe( (res:MouseEvent)=>{
            this.Canvas_MouseMove(res.clientX - rect.left, res.clientY - rect.top);
        });

        Observable.fromEvent(canvasEl,'mousedown').subscribe( (res:MouseEvent)=>{
            this.Canvas_MouseDown(res.clientX - rect.left, res.clientY - rect.top);
        });

        Observable.fromEvent(canvasEl,'mouseup').subscribe( (res:MouseEvent)=>{
            this.Canvas_MouseUp(res.clientX - rect.left, res.clientY - rect.top);
        });

    }


    /*
    ############################################################################################################################
    
    Canvas_MouseMove
    
    ############################################################################################################################
    */
    Canvas_MouseMove(x:number, y:number){

        this.xpoint = x;
        this.ypoint = y;

        this.message = '';

        if ( this.YesMouseDown && this.currentObj != undefined)
        {
            let dx = this.pre_x - x;
            let dy = this.pre_y - y;

            (<BoxBase>this.currentObj).x -= dx;
            (<BoxBase>this.currentObj).y -= dy;

            this.pre_x = x;
            this.pre_y = y;
        }
        else
        {
            this.objects.forEach(i => {

                if (i.CheckMouseOver(x,y))
                {
                    this.message = i.Title;
                }

            });    
        }

        this.Draw();
        
    }

    /*
    ############################################################################################################################
    
    Canvas_MouseDown
    
    ############################################################################################################################
    */
    Canvas_MouseDown(x:number, y:number){

        this.YesMouseDown = true;

        this.currentObj = this.objects.find(i=> i.CheckMouseOver(x,y));

        this.pre_x = x;
        this.pre_y = y;


    }

    /*
    ############################################################################################################################
    
    Canvas_MouseUp
    
    ############################################################################################################################
    */
    Canvas_MouseUp(x:number, y:number){

        this.YesMouseDown = false;

        this.currentObj = undefined;

    }
    

    /*
    ############################################################################################################################
    
    AddBox
    
    ############################################################################################################################
    */
    AddBox(){
        
        let myBox = new BoxBase();

        myBox.x = 10;
        myBox.y = 10;
        myBox.FillColor = 'lightgreen';
        myBox.Width = 100;
        myBox.Height = 100;
        myBox.Title = this.objects.length.toString();
        this.objects.push(myBox);

        this.Draw();

    }

    /*
    ############################################################################################################################
    
    Draw
    
    ############################################################################################################################
    */
    Draw(){

        this.ctx.clearRect(0,0,this.myCanvas.width, this.myCanvas.height);

        for (let obj of this.objects){
            obj.Draw(this.ctx);
        }

    }

    /*
    ############################################################################################################################
    
    Save
    
    ############################################################################################################################
    */
    Save(){

        console.log(this.objects);

        console.log( JSON.stringify(this.objects));
    }

    /*
    ############################################################################################################################
    
    Open
    
    ############################################################################################################################
    */
    Open(){

        let jsonstr = '[{"FillColor":"lightgreen","LineColor":"gray","x":125,"y":104,"Width":100,"Height":100,"Title":"0","YesMouseOver":false,"mover_x1":125,"mover_y1":154,"mover_x2":175,"mover_y2":104,"mover_x3":225,"mover_y3":154,"mover_x4":175,"mover_y4":204},{"FillColor":"lightgreen","LineColor":"gray","x":368,"y":217,"Width":100,"Height":100,"Title":"1","YesMouseOver":false,"mover_x1":368,"mover_y1":267,"mover_x2":418,"mover_y2":217,"mover_x3":468,"mover_y3":267,"mover_x4":418,"mover_y4":317}]';
        let jsonstr2 = '{"FillColor":"lightgreen","LineColor":"gray","x":125,"y":104,"Width":100,"Height":100,"Title":"0","YesMouseOver":false,"mover_x1":125,"mover_y1":154,"mover_x2":175,"mover_y2":104,"mover_x3":225,"mover_y3":154,"mover_x4":175,"mover_y4":204}';
        let jsonobj = JSON.parse(jsonstr);

        // console.log(re);
        // console.log(re.length);

        let myBox : BoxBase;

        for (let obj of jsonobj){
        
            myBox = new BoxBase();
            console.log(JSON.stringify( obj));
            myBox.fillFromJSON(JSON.stringify( obj));
            this.objects.push(myBox);

        }

        this.Draw();

        // let keys = Object.keys(re[0]);

        // console.log(keys);

        // var myBox = new BoxBase();

        // // console.log(jsonobj[0]);

        // myBox.fillFromJSON(jsonstr2);

        // console.log(myBox);

        // this.objects.push(myBox);

        // this.Draw();


    }


}//class
import { Component, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairWise';
import 'rxjs/add/operator/switchMap';
import { BaseObject } from "./shared/shape/BaseObject";
import { BoxBase } from "./shared/shape/BoxBase";
import { UUID } from "angular2-uuid";
import { DiagramService } from "./shared/service/DiagramService";

@Component({
    templateUrl : './canvas01.component.html',
    selector:'app-root',
    providers:[DiagramService]
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

    saveobject : string;


    constructor(private _diagramService : DiagramService){}

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

        

        // Observable.fromEvent(canvasEl,'mousemove').subscribe( (res:MouseEvent)=>{
        //     this.Canvas_MouseMove(res.clientX - rect.left, res.clientY - rect.top);
        // });

        Observable.fromEvent(canvasEl,'mousemove').subscribe( (res:MouseEvent)=>{

            // var x;
            // var y;

            // if (res.pageX || res.pageY) { 
            //     x = res.pageX;
            //     y = res.pageY;
            // }
            // else { 
            //     x = res.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
            //     y = res.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
            // } 

            // x -= canvasEl.offsetLeft;
            // y -= canvasEl.offsetTop;

            // this.Canvas_MouseMove(x,y);

            var re = this.calPoint(canvasEl, res);
            this.Canvas_MouseMove(re.rex, re.rey);

        });

        Observable.fromEvent(canvasEl,'mousedown').subscribe( (res:MouseEvent)=>{

            //this.Canvas_MouseDown(res.clientX - rect.left, res.clientY - rect.top);

            var re = this.calPoint(canvasEl, res);
            this.Canvas_MouseDown(re.rex, re.rey);

        });

        Observable.fromEvent(canvasEl,'mouseup').subscribe( (res:MouseEvent)=>{

            // this.Canvas_MouseUp(res.clientX - rect.left, res.clientY - rect.top);

            var re = this.calPoint(canvasEl, res);
            this.Canvas_MouseUp(re.rex, re.rey);
        });

    }
    /*
    ############################################################################################################################
    
    calPoint
    
    ############################################################################################################################
    */
    calPoint (canvasEl:HTMLCanvasElement ,res:MouseEvent)  {
        let rect = canvasEl.getBoundingClientRect();

        var rex;
        var rey;

        if (res.pageX || res.pageY) { 
            rex = res.pageX;
            rey = res.pageY;
        }
        else { 
            rex = res.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
            rey = res.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
        } 

        rex -= canvasEl.offsetLeft;
        rey -= canvasEl.offsetTop;

        return {rex,rey};
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

                if (i.CheckMouseOver(this.ctx,x,y))
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

        this.objects.forEach(element => {
            element.YesSelected = false;
        });

        this.currentObj = this.objects.find(i=> i.CheckMouseOver(this.ctx,x,y));

        if (this.currentObj != null) this.currentObj.YesSelected = true;


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
        myBox.Id = UUID.UUID();
        
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

        //console.log(this.objects);

        // console.log( JSON.stringify(this.objects));

        this.saveobject = JSON.stringify(this.objects);

        // console.log(this.saveobject);
        
        let userid = UUID.UUID();
        let diagramId = UUID.UUID();

        // this._diagramService.SaveDiagram(userid,diagramId,'test', this.saveobject).subscribe(
        //     data =>
        //     {
        //         alert('ok');
        //     },
        //     error => {
        //         alert('error');
        //         console.log(error);
        //     }
        // );

        this._diagramService.SaveDiagramByJson(userid,diagramId,'test', this.saveobject).subscribe(
        data =>
            {
                console.log(data);
                // alert('ok');
            },
            error => {
                console.log('error');
                // alert('error');
            }
        );


    }

    /*
    ############################################################################################################################
    
    Open
    
    ############################################################################################################################
    */
    Open(){

        // let jsonobj = JSON.parse(this.saveobject);

        // let myBox : BoxBase;

        // for (let obj of jsonobj){
        
        //     myBox = new BoxBase();
        //     myBox.fillFromJSON(JSON.stringify( obj));
        //     this.objects.push(myBox);
        // }

        // this.Draw();

        this._diagramService.OpenDiagram("879bac02-8ae2-21d3-ebfb-7d7fff0ce6f5","d0d035c3-e4fa-612d-1d44-4a7df00c00a9").subscribe(
            data =>{

                alert('ok');
                // console.log(data.value);

                let jsonobj = JSON.parse(data.value);

                let myBox : BoxBase;

                for (let obj of jsonobj){
                
                    myBox = new BoxBase();
                    myBox.fillFromJSON(JSON.stringify( obj));
                    this.objects.push(myBox);
                }

                this.Draw();

            }
            ,error =>{
                alert('error');
                console.log(error);
            }
        );


    }

    /*
    ############################################################################################################################
    
    Clear
    
    ############################################################################################################################
    */
    Clear(){

        this.objects = [];
        this.Draw();
    }


}//class
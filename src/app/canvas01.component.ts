import { Component, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairWise';
import 'rxjs/add/operator/switchMap';
import { BaseObject } from "./shared/shape/BaseObject";
import { BoxBase } from "./shared/shape/BoxBase";
import { LineBase } from "./shared/shape/LineBase";
import { UUID } from "angular2-uuid";
import { DiagramService } from "./shared/service/DiagramService";
import { SelectBox } from "./shared/shape/SelectBox";

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

    yesAddLine : boolean = false;

    KeyDownMessage : string = "";

    YesCanvasMouseOver : boolean = false;

    yesDrawSelectBox : boolean = false;

    selectBox : SelectBox;
    

    /*
    ############################################################################################################################

    constructor
        
    ############################################################################################################################
    */
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

        Observable.fromEvent(canvasEl,'mousemove').subscribe( (res:MouseEvent)=>{

            var re = this.calPoint(canvasEl, res);
            this.Canvas_MouseMove(re.rex, re.rey);

        });

        Observable.fromEvent(canvasEl,'mousedown').subscribe( (res:MouseEvent)=>{

            var re = this.calPoint(canvasEl, res);
            this.YesCanvasMouseOver = true;
            this.Canvas_MouseDown(re.rex, re.rey);

        });

        Observable.fromEvent(canvasEl,'mouseup').subscribe( (res:MouseEvent)=>{

            var re = this.calPoint(canvasEl, res);
            this.Canvas_MouseUp(re.rex, re.rey);
        });

        Observable.fromEvent(canvasEl,'mouseout').subscribe(()=> {
            this.YesCanvasMouseOver = false;
        });

        Observable.fromEvent(canvasEl,'mouseover').subscribe(()=> {
        });


        Observable.fromEvent(document,'keydown').subscribe((e:KeyboardEvent)=>{
            this.Canvas_KeyDown(e);
        });


    }

    /*
    ############################################################################################################################
    
    Canvas_KeyDown
    
    ############################################################################################################################
    */
    Canvas_KeyDown(e : KeyboardEvent){

        let deleteLines : LineBase[] = [];
        let deleteBoxIdList : string[] = [];
        let deleteObjList : BaseObject[] = [];

        if (this.YesCanvasMouseOver)
        {
            switch(e.key)
            {
                case"Delete":{

                    console.log('delete');

                    this.objects.forEach(i => {

                        if (i.YesSelected)
                        {
                            if (i.Type === BoxBase.name)
                            {
                                deleteBoxIdList.push(i.Id);
                            }

                            deleteObjList.push(i);
                        }
                    });

                    deleteObjList.forEach(i => {
                        this.DeleteObject(i);
                    });

                    deleteBoxIdList.forEach(i => {
                        this.objects.forEach(obj => {
                            if (obj instanceof LineBase && (obj.Box_1_ID === i || obj.Box_2_ID === i))
                            {
                                deleteLines.push(obj);
                            }
                        });
                    });

                    deleteLines.forEach( line => {
                        this.DeleteObject(line);
                    });

                    this.Draw();

                    break;
                }
            }
        }
            
    }

    /*
    ############################################################################################################################
    
    DeleteObject
    
    ############################################################################################################################
    */
    DeleteObject(obj:BaseObject){

        let index = this.objects.indexOf(obj);
        if (index > -1) this.objects.splice(index,1);
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

        if (this.currentObj != undefined){
            this.message = this.currentObj.Title;
        }

        if ( this.YesMouseDown )
        {

            if(this.yesDrawSelectBox && this.selectBox != undefined){
                
                this.selectBox.x2 = x;
                this.selectBox.y2 = y;

                this.objects.forEach(i => {
                    i.YesSelected = false;
                });

                this.objects.forEach(i => {
                    i.CheckSelect(
                        this.selectBox.x1,
                        this.selectBox.y1,
                        this.selectBox.x2,
                        this.selectBox.y2
                    );
                });

            }
            else if( this.objects.filter(i=>i.YesSelected).length > 1 ){

                let boxlist : BoxBase[] = [];
                this.objects.filter(i=>i.YesSelected && i.Type === BoxBase.name).forEach(i => {
                    let dx = this.pre_x - x;
                    let dy = this.pre_y - y;
                    (<BoxBase>i).x -= dx;
                    (<BoxBase>i).y -= dy;
                    let circlePoint = (<BoxBase>i).CalMouseOverCirclePoint();
                    boxlist.push(<BoxBase>i);
                });

                boxlist.forEach(box => {
                    this.objects.forEach(i => {
                        if (i instanceof LineBase ){
                            if (i.Box_1_ID === box.Id)
                                i.SetBoxPoint(box, 1);
                            else if(i.Box_2_ID === box.Id)
                                i.SetBoxPoint(box,2);
                        }

                    });    
                });

            }
            else if(this.currentObj != undefined)
            {
                if (this.yesAddLine)
                {
                    this.objects.forEach(i => {
                        i.YesMouseOver = false;
                    });

                    let line : LineBase = <LineBase>this.currentObj;
                    let cirpt;
                    let box = this.objects.find(i=>( 
                        line.Box_1_ID != i.Id &&
                        i instanceof BoxBase &&
                        (cirpt = (<BoxBase>i).CheckCircleMouseOver(this.ctx,x,y)).PointIndex > 0
                        )
                    );

                    if (box != undefined)
                    {
                        line.Box_2_ID = box.Id;
                        line.Box_2_PointIndex = cirpt.PointIndex;
                        line.x2 = cirpt.x;
                        line.y2 = cirpt.y;
                        box.YesMouseOver = true;
                    }
                    else
                    {
                        line.Box_2_ID = '';
                        line.Box_2_PointIndex = 0;
                        line.x2 = x;
                        line.y2 = y;
                    }

                }
                else if ( this.currentObj instanceof BoxBase)
                {
                    let dx = this.pre_x - x;
                    let dy = this.pre_y - y;
                    let box : BoxBase = <BoxBase>this.currentObj;
                    let circlePoint = box.CalMouseOverCirclePoint();

                    (<BoxBase>this.currentObj).x -= dx;
                    (<BoxBase>this.currentObj).y -= dy;

                    this.objects.forEach(i => {
                        if (i instanceof LineBase ){
                            if (i.Box_1_ID === box.Id)
                                i.SetBoxPoint(box, 1);
                            else if(i.Box_2_ID === box.Id)
                                i.SetBoxPoint(box,2);
                        }
                    });
                    
                }
            }
        }
        else{

            this.objects.forEach(i => {

                if (i.CheckMouseOver(this.ctx,x,y))
                {
                    this.message =  "mouse over : " + i.Type;
                }

            });    
        }

        this.pre_x = x;
        this.pre_y = y;
        

        this.Draw();
        
    }

    /*
    ############################################################################################################################
    
    Canvas_MouseDown
    
    ############################################################################################################################
    */
    Canvas_MouseDown(x:number, y:number){

        this.YesMouseDown = true;


        if ( this.objects.filter(i=>i.YesSelected).length > 1 &&  
             this.objects.filter(i=>i.YesSelected).find(i=>i.CheckMouseOver(this.ctx,x,y)) != undefined )
        {

        }
        else
        {
            this.objects.forEach(element => {
                element.YesSelected = false;
            });
            
            this.objects.forEach(i => {

                if ( i instanceof BoxBase && this.yesAddLine === false ){

                    let re = i.CheckCircleMouseOver(this.ctx, x,y);

                    if (re.x >= 0){

                        this.yesAddLine = true;
                        let myline = new LineBase();

                        myline.x1 = re.x;
                        myline.y1 = re.y;
                        myline.x2 = re.x;
                        myline.y2 = re.y;
                        myline.Title = "Line";
                        myline.Box_1_ID = i.Id;
                        myline.Box_1_PointIndex = re.PointIndex;
                        myline.YesDrawEndArrow = true;
                        this.currentObj = myline;

                        this.objects.push(myline);

                        this.message = "circle down ok";

                    }
                    
                }
            });

            if (this.yesAddLine === false){

                this.currentObj = this.objects.find(i=> i.CheckMouseOver(this.ctx,x,y));

                if (this.currentObj != null) 
                {
                    this.currentObj.YesSelected = true;
                    this.message = 'selected : ' + this.currentObj.Type;
                }
                else{

                    this.yesDrawSelectBox = true;
                    this.selectBox = new SelectBox();

                    this.selectBox.x1 = x;
                    this.selectBox.x2 = x;
                    this.selectBox.y1 = y;
                    this.selectBox.y2 = y;

                    this.objects.push(this.selectBox);

                }

            }

            this.pre_x = x;
            this.pre_y = y;

            if (this.currentObj != undefined) this.Draw();
            
        }

        



    }

    /*
    ############################################################################################################################
    
    Canvas_MouseUp
    
    ############################################################################################################################
    */
    Canvas_MouseUp(x:number, y:number){

        if (this.yesAddLine)
        {
            let line:LineBase = <LineBase>this.currentObj;

            if (line.Box_2_ID === "")
            {
                let index = this.objects.indexOf(line);
                if (index > -1) this.objects.splice(index,1);
            }
        }
        else if(this.yesDrawSelectBox){

            this.objects.filter(i=>i.Type === SelectBox.name).forEach(i => {
                this.DeleteObject(i);    
            });
            
            this.yesDrawSelectBox = false;

        }
       

        this.YesMouseDown = false;
        this.currentObj = undefined;
        this.yesAddLine = false;

        this.Draw();

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
        myBox.Height = 50;
        myBox.Title = "Box "+ this.objects.length.toString();
        
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

        let key1 : string = "bf0263cf-e90c-a0e7-28b2-94804945bc3e";
        let key2 : string = "f7046d37-80a9-606c-794c-d30f65a0c538";


        this._diagramService.OpenDiagram(key1,key2).subscribe(
            data =>{

                alert('ok');
                // console.log(data.value);

                let jsonobj = JSON.parse(data.value);

                let myBox : BoxBase;
                let myLine : LineBase;

                for (let obj of jsonobj){

                    if (obj.Type === BoxBase.name)
                    {
                        myBox = new BoxBase();
                        myBox.fillFromJSON(JSON.stringify( obj));
                        this.objects.push(myBox);
                    }
                    else if(obj.Type === LineBase.name)
                    {
                        myLine = new LineBase();
                        myLine.fillFromJSON(JSON.stringify(obj));
                        this.objects.push(myLine);
                    }
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

    /*
    ############################################################################################################################
    
    SetSeq
    
    ############################################################################################################################
    */
    SetSeq(){

        

    }


}//class
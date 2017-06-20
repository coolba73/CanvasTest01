import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairWise';
import 'rxjs/add/operator/switchMap';
import { BoxBase } from "./shared/drawobject/boxbase";
import { BaseObject  } from "./shared/drawobject/baseobject";
import { LineBase } from "./shared/drawobject/linebase";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
  pre_x:number=0;
  pre_y:number=0;

  message:string='mouse up';
  currentObj : BaseObject;

  @ViewChild("myCanvas") myCanvas:ElementRef;

  canvas : HTMLCanvasElement;
  ctx : CanvasRenderingContext2D;

  objects : BaseObject[] = [];
  

  YesMouseDown : boolean;

  xpoint : number;
  ypoint : number;

  //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
  ngAfterViewInit(){

    this.ctx = this.myCanvas.nativeElement.getContext("2d");
    // context.fillStyle = 'blue';
    // context.fillRect(10,10,150,150);
    
    this.canvas = <HTMLCanvasElement>this.myCanvas.nativeElement;
    

    // let myBox = new BoxBase(this.canvas);

    // myBox.X = 10;
    // myBox.Y = 10;
    // myBox.FillColor = "lightgreen";
    // this.objects.push(myBox);

    // myBox = new BoxBase(this.canvas);

    // myBox.X = 150;
    // myBox.Y = 10;
    // myBox.FillColor = 'lightblue';
    // this.objects.push(myBox);


    // let myLine = new LineBase(this.canvas);

    // myLine.X1 = 100;
    // myLine.Y1 = 100;
    // myLine.X2 = 200;
    // myLine.Y2 = 200;

    // this.objects.push(myLine);

    // this.Draw();

    this.captureEvents(this.myCanvas.nativeElement);

    console.log('canva width : ' + (<HTMLCanvasElement>this.myCanvas.nativeElement).width);
    console.log('canva height : ' + (<HTMLCanvasElement>this.myCanvas.nativeElement).height);

  }


  //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
  private captureEvents(canvasEl:HTMLCanvasElement)
  {

    let rect = canvasEl.getBoundingClientRect();
    let x : number;
    let y : number;

    Observable.fromEvent(canvasEl,'mousemove').subscribe( (res : MouseEvent) =>
      {

        x = res.clientX - rect.left;
        y = res.clientY - rect.top;

        this.MouseMove(x, y);

      }
    );


    Observable.fromEvent(canvasEl,'mousedown').subscribe( (res : MouseEvent) =>
      {
        x = res.clientX - rect.left;
        y = res.clientY - rect.top;

        this.MouseDown(x,y);
      }
    );

    Observable.fromEvent(canvasEl,'mouseup').subscribe( (res : MouseEvent) =>
      {
        x = res.clientX - rect.left;
        y = res.clientY - rect.top;

        this.MouseUp(x,y);

      }
    );


  }

  //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
  MouseMove(x:number,y:number) : void {

      this.xpoint = x;
      this.ypoint = y;
      
      this.objects.forEach(element => {

        if (element instanceof BoxBase){

          if ((<BoxBase>element).CheckMouseOver(x,y )){
            this.message = 'mouse over';
          }
          else{
            this.message = 'mouse not over';
          }

        }
        
      });

      


      if ( this.YesMouseDown && this.currentObj != undefined)
      {
        //console.log('box move');

        let dx : number = this.pre_x - x;
        let dy : number = this.pre_y - y;

        (<BoxBase>this.currentObj).X -= dx;
        (<BoxBase>this.currentObj).Y -= dy;

        this.pre_x = x;
        this.pre_y = y;
        
      }

      this.Draw();

  }

  //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
  MouseUp(x:number, y:number) : void {
    this.message = 'Mouse UP';
    this.YesMouseDown = false;
  }

  //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
  MouseDown(x:number,y:number) : void {
    this.message = 'Mouse Down'
    this.YesMouseDown = true;

    this.pre_x = x;
    this.pre_y = y;

    this.currentObj = this.objects.find(i => i.CheckMouseOver(x,y));

  }


  //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
  Draw():void{

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(let obj of this.objects){
      obj.Draw();

      // if (obj instanceof BoxBase)m
      //   console.log('box base');
      // else if(obj instanceof LineBase)
      //   console.log('line base');
      
    }

  }

  //________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
  AddBox():void{

    let myBox = new BoxBase(this.canvas);

    myBox.X = 10;
    myBox.Y = 10;
    myBox.FillColor = "lightgreen";
    this.objects.push(myBox);

    this.Draw();

  }

  





 


}//class

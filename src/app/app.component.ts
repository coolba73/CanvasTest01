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

  xpoint:number=0;
  ypoint:number=0;
  message:string='mouse up';

  @ViewChild("myCanvas") myCanvas:ElementRef;
  
  ngAfterViewInit(){

    let context : CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
    // context.fillStyle = 'blue';
    // context.fillRect(10,10,150,150);

    
    let objects : BaseObject[] = [];

    let myBox = new BoxBase(context);

    myBox.X = 10;
    myBox.Y = 10;
    myBox.FillColor = "lightgreen";
    objects.push(myBox);

    myBox = new BoxBase(context);

    myBox.X = 150;
    myBox.Y = 10;
    myBox.FillColor = 'lightblue';
    objects.push(myBox);


    let myLine = new LineBase(context);

    myLine.X1 = 100;
    myLine.Y1 = 100;
    myLine.X2 = 200;
    myLine.Y2 = 200;

    objects.push(myLine);


    for(let obj of objects){
      obj.Draw();

      if (obj instanceof BoxBase)
        console.log('box base');
      else if(obj instanceof LineBase)
        console.log('line base');
      
    }

    this.captureEvents(this.myCanvas.nativeElement);

  }


  private captureEvents(canvasEl:HTMLCanvasElement)
  {

    var rect = canvasEl.getBoundingClientRect();

    Observable.fromEvent(canvasEl,'mousemove').subscribe( (res : MouseEvent) =>
      {
        this.xpoint = res.clientX - rect.left;
        this.ypoint = res.clientY - rect.top;

      }
    );


    Observable.fromEvent(canvasEl,'mousedown').subscribe( (res : MouseEvent) =>
      {
        this.message = 'mouse down';
      }
    );

    Observable.fromEvent(canvasEl,'mouseup').subscribe( (res : MouseEvent) =>
      {
        this.message = "mouse up";
      }
    );


  }





 


}//class

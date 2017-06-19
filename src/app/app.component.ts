import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairWise';
import 'rxjs/add/operator/switchMap';
import {BoxBase} from "./shared/drawobject/boxbase";
import { BaseObject  } from "./shared/drawobject/baseobject";

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

    let myBox = new BoxBase();

    myBox.x = 10;
    myBox.y = 10;
    objects.push(myBox);

    myBox = new BoxBase();

    myBox.x = 150;
    myBox.y = 10;
    objects.push(myBox);

    for(let obj of objects){
      obj.Draw(context);
    }



    //myBox.Draw(context);
    

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

import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairWise';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  xpoint:number=0;
  ypoint:number=0;
  message:string='test';

  @ViewChild("myCanvas") myCanvas:ElementRef;
  
  ngAfterViewInit(){

    let context : CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
    context.fillStyle = 'blue';
    context.fillRect(10,10,150,150);

    this.captureEvents(this.myCanvas.nativeElement);

  }

  private captureEvents(canvasEl:HTMLCanvasElement)
  {
    Observable.fromEvent(canvasEl,'mousemove').subscribe( (res : MouseEvent) =>
      {
        this.xpoint = res.clientX;
        this.ypoint = res.clientY;
      }
    );
  }





 


}//class

import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("myCanvas") myCanvas:ElementRef;

  ngAfterViewInit(){

    let context : CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
    context.fillStyle = 'blue';
    context.fillRect(10,10,150,150);

  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Canvas01Component } from "./canvas01.component";

@NgModule({
  declarations: [
    AppComponent,
    Canvas01Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [Canvas01Component]
})
export class AppModule { }

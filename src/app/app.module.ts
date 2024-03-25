import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-item/todo-item.component';
import { TodolistQrcodeComponent } from './todolist-qrcode/todolist-qrcode.component';
import {QRCodeModule} from 'angular2-qrcode';
import {RouterModule} from '@angular/router';
import { TodolistTitleComponent } from './todolist-title/todolist-title.component';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodolistQrcodeComponent,
    TodolistTitleComponent,
    SpeechRecognitionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    QRCodeModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

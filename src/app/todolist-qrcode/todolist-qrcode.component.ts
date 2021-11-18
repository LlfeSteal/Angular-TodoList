import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist-qrcode',
  templateUrl: './todolist-qrcode.component.html',
  styleUrls: ['./todolist-qrcode.component.scss']
})
export class TodolistQrcodeComponent {

  href: string;
  @Input() data!: string;

  constructor() {
    this.href = 'http://localhost:4200/';
  }


}

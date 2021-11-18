import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistQrcodeComponent } from './todolist-qrcode.component';

describe('TodolistQrcodeComponent', () => {
  let component: TodolistQrcodeComponent;
  let fixture: ComponentFixture<TodolistQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistQrcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

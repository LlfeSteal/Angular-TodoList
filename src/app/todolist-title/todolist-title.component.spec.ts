import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistTitleComponent } from './todolist-title.component';

describe('TodolistTitleComponent', () => {
  let component: TodolistTitleComponent;
  let fixture: ComponentFixture<TodolistTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

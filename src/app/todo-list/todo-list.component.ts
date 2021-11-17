import {Component} from '@angular/core';
import {TodoItem, TodoList, TodolistService} from '../services/todolist.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-todolist',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  todoInputValue: string;
  todoListService: TodolistService;
  currentFilter: () => Observable<TodoList>;

  constructor(service: TodolistService) {
    this.todoListService = service;
    this.todoInputValue = '';
    this.currentFilter = this.filterAll;
  }

  addTodo(): void {
    console.log('add TODO');
    this.todoListService.append(this.todoInputValue);
    this.todoInputValue = '';
  }

  deleteTodo(todo: TodoItem): void {
    this.todoListService.remove(todo);
  }

  updateTodo(event: Partial<TodoItem>, todo: TodoItem): void {
    this.todoListService.update(event, todo);
  }

  getTodoRemainsNumber(list: Readonly< TodoItem[] >): number {
    return list.reduce((total, v) => (!v.isDone ? total + 1 : total), 0);
  }

  filterAll(): Observable<TodoList> {
    return this.todoListService.observable.pipe();
  }

  filterActives(): Observable<TodoList> {
    return this.todoListService.observable.pipe();
  }



}

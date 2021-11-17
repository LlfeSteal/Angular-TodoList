import {Component} from '@angular/core';
import {TodoItem, TodolistService} from '../services/todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  todoInputValue: string;
  todoListService: TodolistService;
  currentFilter: (item: TodoItem) => boolean;

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

  filterAll(): boolean {
    return true;
  }

  filterActives(item: TodoItem): boolean {
    return !item.isDone;
  }

  filterInactives(item: TodoItem): boolean {
    return !this.filterActives(item);
  }
}

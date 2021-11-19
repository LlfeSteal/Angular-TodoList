import {Component} from '@angular/core';
import {TodoItem, TodolistService, tdlToString, TodoList, strToTdl} from '../services/todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  todoInputValue: string;
  todoListService: TodolistService;
  currentFilter: (item: TodoItem) => boolean;
  toggleAllState: boolean;

  constructor(service: TodolistService) {
    this.todoListService = service;
    this.todoInputValue = '';
    this.currentFilter = this.filterAll;
    this.toggleAllState = true;
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

  getTodoRemainsNumber(list: Readonly<TodoItem[]>): number {
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

  undo(): void {
    this.todoListService.undo();
  }

  redo(): void {
    this.todoListService.redo();
  }

  removeAllDoneItems(): void {
    const selectPartialTodoItem: Partial<TodoItem> = {isDone: true};
    this.todoListService.removeAll(selectPartialTodoItem);
  }

  toggleAll(): void {
    const selectPartialTodoItem: Partial<TodoItem> = {isDone: this.toggleAllState};
    this.todoListService.updateAll(selectPartialTodoItem);
    this.toggleAllState = !this.toggleAllState;
  }

  stringifyData(todolist: TodoList): string {
    return tdlToString(todolist);
  }

  loadServiceData(data: string|null): void {
    if (data != null) {
      const todoList: TodoList = strToTdl(data);
      this.todoListService.loadData(todoList);
    }
  }
}

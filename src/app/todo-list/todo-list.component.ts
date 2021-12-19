import {Component, OnInit} from '@angular/core';
import {TodoItem, TodolistService, tdlToString, TodoList, strToTdl} from '../services/todolist.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todolist',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoInputValue: string;
  todoListService: TodolistService;
  currentFilter: (item: TodoItem) => boolean;
  toggleAllState: boolean;
  route: ActivatedRoute;

  constructor(service: TodolistService, route: ActivatedRoute) {
    this.todoListService = service;
    this.todoInputValue = '';
    this.currentFilter = this.filterAll;
    this.toggleAllState = true;
    this.route = route;
  }

  addTodoFromInput(): void {
    this.addTodo(this.todoInputValue);
    this.todoInputValue = '';
  }

  addTodo(text: string): void {
    this.todoListService.append(text);
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

  loadUrlDatas(data: string | null): void {
    if (data != null) {
      const todoList: TodoList = strToTdl(data);
      this.todoListService.loadData(todoList);
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const data = params.get('data');
      this.loadUrlDatas(data);
    });
  }

  updateTodolistTitle(event: string): void {
    this.todoListService.setTitle(event);
  }

  dropItem(event: CdkDragDrop<string[]>): void {
    this.todoListService.changeItemIndex(event.previousIndex, event.currentIndex);
  }
}

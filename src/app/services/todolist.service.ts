import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {moveItemInArray} from '@angular/cdk/drag-drop';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly id: number;
}

export interface TodoList {
  readonly label: string;
  readonly items: Readonly<TodoItem[]>;
}

let idItem = 0;

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private current: TodoList = {label: 'MIAGE', items: []};
  private subj = new BehaviorSubject<TodoList>(this.current);
  readonly observable = this.subj.asObservable();
  private previous: TodoList[] = [];
  private futures: TodoList[] = [];

  constructor() {
    this.managePersistency();
    this.manageUndoRedo();
  }

  append(...labels: Readonly<string[]>): this {
    const L: TodoList = this.subj.getValue();
    this.subj.next({
      ...L,
      items: [
        ...L.items,
        ...labels.filter(l => l !== '').map(
          label => ({label, isDone: false, id: idItem++})
        )
      ]
    });
    return this;
  }

  remove(...items: Readonly<TodoItem[]>): this {
    const L = this.subj.getValue();
    const NL = {...L, items: L.items.filter(item => items.indexOf(item) === -1)};
    this.subj.next(NL);
    return this;
  }

  removeAll(data?: Partial<TodoItem>): this {
    let items: TodoItem[] = [...this.current.items];
    if (data != null) {
      items = this.current.items.filter((value) => value.isDone === data.isDone || value.label === data.label);
    }
    return this.remove(...items);
  }

  update(data: Partial<TodoItem>, ...items: Readonly<TodoItem[]>): this {
    if (data.label !== '') {
      const L = this.subj.getValue();
      const NL = {...L, items: L.items.map(item => items.indexOf(item) >= 0 ? {...item, ...data} : item)};
      this.subj.next(NL);
    } else {
      this.remove(...items);
    }
    return this;
  }

  updateAll(data: Partial<TodoItem>): this {
    return this.update(data, ...this.current.items);
  }

  undo(): this {
    if (this.previous.length > 0) {
      this.subj.next(this.previous[this.previous.length - 1]);
    }
    return this;
  }

  redo(): this {
    if (this.futures.length > 0) {
      this.subj.next(this.futures[this.futures.length - 1]);
    }
    return this;
  }

  setTitle(title: string): void {
    const L = this.subj.getValue();
    const NL = {label: title, items: L.items};
    this.subj.next(NL);
  }

  hasUndos(): boolean {
    return this.previous.length > 0;
  }

  hasRedos(): boolean {
    return this.futures.length > 0;
  }

  loadData(todoList: TodoList): void {
    this.previous = [];
    this.futures = [];
    this.subj.next(todoList);
  }

  changeItemIndex(previousIndex: number, nextIndex: number): void {
    const items: TodoItem[] = [...this.current.items];
    moveItemInArray(items, previousIndex, nextIndex);
    const NL = {label: this.current.label, items: [...items]};
    this.subj.next(NL);
  }

  private managePersistency(): void {
    const str = localStorage.getItem('TDL_L3_MIAGE');
    if (str && str !== tdlToString(this.current)) {
      this.subj.next(strToTdl(str));
    }
  }

  private manageUndoRedo(): void {
    this.observable.subscribe(tdl => {
      if (tdl !== this.current) {
        localStorage.setItem('TDL_L3_MIAGE', tdlToString(tdl));
        // Undo-redo
        const indexInPrevious = this.previous.indexOf(tdl);
        if (indexInPrevious >= 0) { // Is it a previous version of the list ?
          const L = this.previous.splice(indexInPrevious, this.previous.length);
          this.futures.push(this.current, ...L.reverse());
          this.futures.pop(); // On enlève la liste courante
        } else {
          const indexInFutures = this.futures.indexOf(tdl);
          if (indexInFutures >= 0) { // Is it a future version of the list ?
            const L = this.futures.splice(indexInFutures, this.futures.length);
            this.previous.push(this.current, ...L.reverse());
            this.previous.pop();
          } else {
            // This is a new version
            if (this.futures.length) {
              const L = [...this.futures, this.current];
              const RL = [...L].reverse().map(TDL => ({...TDL}));
              RL.pop();
              this.previous.push(...RL, ...L);
            } else {
              this.previous.push(this.current);
            }
            this.futures = [];
          }
        }
        this.current = tdl;
      }
    });
  }
}

export function tdlToString(tdl: TodoList): string {
  return JSON.stringify(tdl);
}

export function strToTdl(str: string): TodoList {
  const L: TodoList = JSON.parse(str);
  idItem = L.items.reduce((id, item) => id <= item.id ? item.id + 1 : id, 0);
  return L;
}

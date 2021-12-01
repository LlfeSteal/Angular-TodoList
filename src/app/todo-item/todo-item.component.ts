import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {TodoItem} from '../services/todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {

  @Input() todo!: TodoItem;

  @Output() deleteEmitter: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() updateEmitter: EventEmitter<Partial<TodoItem>> = new EventEmitter<Partial<TodoItem>>();
  editing = false;
  newValue!: string;
  @ViewChild('newTodoItemInput') newTextInput!: ElementRef<HTMLInputElement>;

  delete(): void {
    this.deleteEmitter.emit(this.todo);
  }

  setEditing(newValue: boolean): void {
    this.editing = newValue;
    if (newValue) {
      requestAnimationFrame(
        () => this.newTextInput.nativeElement.focus()
      );
    }
  }

  toggleMode(): void {
    this.setEditing(!this.editing);
    this.newValue = this.todo.label;
  }

  updateValue(): void {
    if (this.newValue !== undefined && this.newValue !== '') {
      const todoModification: Partial<TodoItem> = {label: this.newValue};
      this.updateEmitter.emit(todoModification);
    }
    this.toggleMode();
  }

  updateDone(event: any): void {
    const todoModification: Partial<TodoItem> = {isDone: event.target.checked};
    this.updateEmitter.emit(todoModification);
  }
}

import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-todolist-title',
  templateUrl: './todolist-title.component.html',
  styleUrls: ['./todolist-title.component.scss']
})
export class TodolistTitleComponent {

  @Input() title!: string;
  newValue!: string;
  editing = false;
  @Output() updateEmitter: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('newTitleInput') newTextInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.newValue = this.title;
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
    this.newValue = this.title;
  }

  updateValue(): void {
    if (this.newValue !== undefined && this.newValue !== '') {
      this.updateEmitter.emit(this.newValue);
      this.toggleMode();
    }
  }
}

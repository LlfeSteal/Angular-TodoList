import {Component, EventEmitter, Output} from '@angular/core';
import {SpeechRecognitionService} from '../services/speech-recognition.service';


@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss']
})
export class SpeechRecognitionComponent {

  speechService: SpeechRecognitionService;
  @Output() todoItemEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(speechService: SpeechRecognitionService) {
    this.speechService = speechService;
    this.speechService.init();
    this.speechService.observable.subscribe((value => this.emitText(value)));
  }

  emitText(text: string): void {
    this.todoItemEmitter.emit(text);
  }

  startService(): void {
    this.speechService.start();
    this.speechService.error = false;
  }

}

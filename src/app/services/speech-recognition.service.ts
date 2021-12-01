import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

declare const webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  error = true;
  recognition = new webkitSpeechRecognition();
  text = '';
  subj = new BehaviorSubject<string>(this.text);
  observable = this.subj.asObservable();

  init(): void {
    this.recognition.lang = 'fr-FR';
    this.recognition.addEventListener('result', (e: any) => {
      if (e.results[0].isFinal) {
        console.log(e.results[0][0].transcript);
        this.subj.next(e.results[0][0].transcript);
        this.stop();
      }
    });
  }

  start(): void {
    this.recognition.start();
  }

  stop(): void {
    this.text = '';
    this.recognition.stop();
  }
}

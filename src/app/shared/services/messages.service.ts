import { Injectable } from '@angular/core';
import { Message } from './../models/Message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private message$ = new Subject<Message>();
  private submit$ = new Subject<boolean>();

  constructor() { }

  setMessage(msg:Message) {
    this.message$.next(msg);
  }

  getMessage() {
    return this.message$.asObservable();
  }
  
  getSubmit() {
    return this.submit$.asObservable();
  }

  submit(confirmation = true) {
    this.submit$.next(confirmation);
  }

}

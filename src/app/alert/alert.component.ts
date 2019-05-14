import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MessagesService } from './../shared/services/messages.service';
import { Message } from './../shared/models/Message';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit {
  isShow = false;
  message: Message;

  constructor(
    private msgService: MessagesService
  ){}

  ngOnInit() {
   
    this.msgService.getMessage().subscribe( (msg: Message) => {
      console.log("msg", msg);

      this.message = msg;
      this.isShow = true;
      if (!msg.action) {
        setTimeout(() => {this.isShow = false}, 2000);
      }
    })

  }

  submit() {
    this.isShow = false;
    this.msgService.submit();
  }
  
  close() {
    this.isShow = false;
    this.msgService.submit(false);
    
  }

}

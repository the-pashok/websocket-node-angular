import { Component } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

import {MessageService} from './message.service';

declare var WebSocket: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public form: FormGroup;
  public socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
  public echoSocketUrl = this.socketProtocol + '//localhost:3000';
  public socket = new WebSocket(this.echoSocketUrl);
  public data = '';
  public isFetched: boolean;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      message: new FormControl('', Validators.required)
    });
    this.socket.onmessage = e => {
      this.data = e.data;
    };
  }

  public onSubmit(): void {
    const message = this.form.get('message').value;
    this.messageService.sendMessage(message)
      .subscribe(() => this.isFetched = true);
  }
}

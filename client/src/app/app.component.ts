import { Component } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MessageService} from './message.service';

declare var WebSocket: any;

const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
const echoSocketUrl = socketProtocol + '//localhost:85';
const socket = new WebSocket(echoSocketUrl);
let data;

socket.onmessage = e => {
  console.log('Message from server: ', e);
  data = e.data;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public destroy$ = new Subject();
  public form: FormGroup;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      message: new FormControl('', Validators.required),
      output: new FormControl('')
    });
  }

  public onSubmit(): void {
    const message = this.form.get('message').value;
    this.messageService.sendMessage(message).pipe(takeUntil(this.destroy$))
      .subscribe(res => this.form.get('output').setValue(data));
  }
}

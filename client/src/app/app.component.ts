import { Component } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MessageService} from './message.service';

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
      .subscribe(res => {
        console.log(res);
      });
  }
}

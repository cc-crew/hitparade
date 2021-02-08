import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  private subscriptions: Subscription[] = [];

  mailIsSent: any;
  invalidCredentials: any;
  mailNotSent: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      comment: ['']
    });
  }

  ngOnInit(): void {
  }

  sendMessage(): void {
    if (this.form.valid) {
/*      const body: MailBodyModel = {
        email: this.form.value.email,
        messageText: this.form.value.comment,
        name: this.form.value.fullname
      };
      this.isLoading = true;
      this.subscriptions.push(this.mailService.sendMails(body).subscribe((res) => {
        if (res.status === 200) {
          this.mailIsSent = true;
          this.isLoading = false;
          setTimeout(() => {
            this.mailIsSent = false;
          }, 3000);
        } else {
          this.mailNotSent = true;
          this.isLoading = false;
        }
      }));*/
    } else {
      this.invalidCredentials = true;
      setTimeout(() => {
        this.invalidCredentials = false;
      }, 3000);
    }

  }

}

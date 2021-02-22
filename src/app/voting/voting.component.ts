import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MailService} from './mail.service';

class MailBodyModel {
  email: string | undefined;
  fullName: string| undefined;
  title1: string | undefined;
  interpret1: string | undefined;
  title2: string| undefined;
  interpret2: string| undefined;
  title3: string| undefined;
  interpret3: string| undefined;
}

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit, OnDestroy {

  isLoading = false;
  form: FormGroup;
  private subscriptions: Subscription[] = [];

  mailIsSent: any;
  invalidCredentials: any;
  mailNotSent: any;

  constructor(private fb: FormBuilder, private mailService: MailService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      interpret1: ['', Validators.required],
      title1: ['', Validators.required],
      interpret2: [''],
      title2: [''],
      interpret3: [''],
      title3: [''],

    });
  }

  ngOnInit(): void {
  }

  sendMessage(): void {
    if (this.form.valid) {
      const body: MailBodyModel = {
        email: this.form.value.email,
        fullName: this.form.value.fullName,
        title1: this.form.value.title1,
        interpret1: this.form.value.interpret1,
        title2: this.form.value.title2,
        interpret2: this.form.value.interpret2,
        title3: this.form.value.title3,
        interpret3: this.form.value.interpret3,
      };
      this.isLoading = true;
      this.subscriptions.push(this.mailService.sendVoting(body).subscribe((res) => {
        if (res.status === 200) {
          this.mailIsSent = true;
          this.isLoading = false;
/*          setTimeout(() => {
            this.mailIsSent = false;
          }, 3000);*/
        } else {
          this.mailNotSent = true;
          this.isLoading = false;
        }
      }));
    } else {
      this.invalidCredentials = true;
      setTimeout(() => {
        this.invalidCredentials = false;
      }, 3000);
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

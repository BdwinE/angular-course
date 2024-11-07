import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('formGroup') fG!: NgForm;
  submitted = false;
  sub = {
    subscription: '',
    email: '',
    password: '',
  };

  onSubmit(fG: NgForm) {
    console.log(this.fG.form.value.subscription);
    this.submitted = true;
    this.sub.subscription = this.fG.value.subscription;
    this.sub.email = fG.value.email;
    this.sub.password = fG.value.password;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get isEmailRequired() {
    return this.emailControl.invalid
      && this.emailControl.touched
      && this.emailControl.errors['required'];
  }

  get isEmailFormatError() {
    return this.emailControl.invalid
      && this.emailControl.touched
      && this.emailControl.errors['pattern'];
  }

  get isPasswordRequired() {
    return this.passwordControl.invalid
      && this.passwordControl.touched
      && this.passwordControl.errors['required'];
  }

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
      || '/shop';
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required),
    })
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value)
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      }, error => console.log(error));
  }
}

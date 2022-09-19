import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, AuthService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  public pageType: String = '';
  public pageTitle: String = '';
  public errors: Errors = { errors: {} };
  public isSubmitting = false;
  public authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    //auth form
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.pageType = data[data.length - 1].path;
      this.pageTitle = (this.pageType === 'login') ? 'Sign in' : 'Sign up';
      // add form controls for sign up form
      if (this.pageType === 'register') {
        this.authForm.addControl('username', new FormControl());
        this.authForm.addControl('name', new FormControl());
      }
    });
  }

  public submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };
    const payload = this.authForm.value;
    if (this.pageType == 'login') {
      this.authService
        .loginUser(payload)
        .subscribe(
          data => this.router.navigateByUrl('/'),
          err => {
            this.errors = err;
            this.isSubmitting = false;
          }
        );
    } else {
      this.authService
        .registerUser(payload)
        .subscribe(
          data => this.router.navigateByUrl('/login'),
          err => {
            this.errors = err;
            this.isSubmitting = false;
          }
        );
    }
  }
}

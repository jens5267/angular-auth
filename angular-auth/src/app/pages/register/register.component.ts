import { AuthServiceService } from './../../services/auth-service.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  type: any;
  message: any;

  registerForm!: FormGroup;

  jwt: string = this.user.getJwt();
  refresh_token: string = this.user.getRefresh();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.user.verify();
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit(): void {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.getRawValue()).subscribe(
        (res: any) => {
          this.success(res);
        },
        (err: any) => {
          this.error(err);
        }
      );
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  success(res: any) {
    console.log(res);
    return this.router.navigate(['/login']);
  }

  error(error: any) {
    if (
      error.error.email &&
      error.error.email[0] === 'User with this email already exist!'
    ) {
      this.type = 'alert-danger';
      this.message = 'This email already taken';
    } else if (
      error.error.username[0] === 'A user with that username already exists.'
    ) {
      this.type = 'alert-danger';
      this.message = 'This username already taken';
    }
  }
}

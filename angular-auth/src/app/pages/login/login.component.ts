import { AuthServiceService } from './../../services/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  type: any;
  message: any;
  loading:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService,
    public auth: AuthServiceService
  ) {}
  ngOnInit(): void {
    this.user.verify();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    this.loading = true
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.getRawValue()).subscribe(
        (res: any) => {
          this.success(res);
          this.loading = false;
        },
        (err: any) => {
          this.error(err);
          this.loading = false;
        }
      );
    }
  }

  success(response: any) {
    this.user.setJwt(response['access']);
    this.user.setRefresh(response['refresh']);
    return this.router.navigate(['/']);
  }
  error(error: any) {
    if (error['status'] === 401) {
      this.type = 'alert-danger';
      this.message = 'Your username or password is incorrect';
    } else {
      this.type = 'alert-danger';
      this.message = 'Internal server error , sorry 😑';
    }
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}

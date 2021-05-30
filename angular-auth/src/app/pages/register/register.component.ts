import { UserService } from './../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  type: any;
  message: any;
  // form
  registerForm!: FormGroup;
  // define tokens
  jwt: string = this.cookie.get('jwt');
  refresh_token: string = this.cookie.get('refresh');

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private user:UserService
  ) {}

  ngOnInit(): void {
    this.user.verify(this.jwt, this.refresh_token);
    this.registerForm = this.formBuilder.group({
      // Form validators: username , password & email
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  // get email data from input
  get email() {
    return this.registerForm.get('email');
  }
  // get username data from input
  get username() {
    return this.registerForm.get('username');
  }
  // get password data from input
  get password() {
    return this.registerForm.get('password');
  }
  // This function validates form then sends request to backend
  submit(): void {
    if (this.registerForm.valid) {
      this.http
        .post(`${environment.backend}/api/auth/users/`, this.registerForm.getRawValue())
        .subscribe(
          (res: any) => {
            // if register was successfuly , this component navigates user to login page
            this.router.navigate(['/login']);
          },
          (err: any) => {
            // if smth was wrong , alert it !
            if (err['status'] === 400) {
              this.type = 'alert-danger';
              this.message = 'This username already taken';
            }
          }
        );
    }
  }
}

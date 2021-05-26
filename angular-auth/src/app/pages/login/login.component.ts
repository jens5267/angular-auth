import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  type: any;
  message: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // Form validation
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // get name from input data
  get username() {
    return this.loginForm.get('username');
  }
  // get password from input data
  get password() {
    return this.loginForm.get('password');
  }
  // submit function
  // check form valid & send POST request to backend
  submit(): void {
    if (this.loginForm.valid) {
      let input_data = this.loginForm.getRawValue();
      this.http
        .post(`${environment.backend}/api/auth/jwt/create`, input_data, {withCredentials: true})
        .subscribe(
          (res: any) => {
            console.log(res['access'])
            // set tokens to cookie
            this.cookie.set('jwt', res['access'])
            this.cookie.set('refresh', res['refresh'])
            // navigate home page
            this.router.navigate(['/'])
          },
          (err: any) => {
            if (err['status'] === 400) {
              this.type = 'alert-danger';
              this.message = 'This username already taken';
            }
          }
        );
    }
  }
}

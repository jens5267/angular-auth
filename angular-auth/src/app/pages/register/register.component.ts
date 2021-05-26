import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  type: any;
  message: any;
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      // Form validation
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
  // submit function
  // form validation then send POST request to backend
  submit(): void {
    if (this.registerForm.valid) {
      let input_data = this.registerForm.getRawValue();
      this.http
        .post(`${environment.backend}/api/auth/users/`, input_data)
        .subscribe(
          (res: any) => {
            // register success , navigate to login page
            this.router.navigate(['/login']);
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

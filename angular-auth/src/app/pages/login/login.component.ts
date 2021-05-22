import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientModule,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // Form validation
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // get name from input data
  get name() {
    return this.loginForm.get('name');
  }
  // get password from input data
  get password() {
    return this.loginForm.get('password');
  }
  // submit function
  // check form valid & send POST request to backend
  submit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
    }
  }
}

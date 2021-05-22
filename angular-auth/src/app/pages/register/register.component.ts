import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientModule,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      // Form validation
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  // get email data from input
  get email() {
    return this.registerForm.get('email');
  }
  // get username data from input
  get name() {
    return this.registerForm.get('name');
  }
  // get password data from input
  get password() {
    return this.registerForm.get('password');
  }
  // submit function
  // check form valid & send POST request to backend
  submit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.getRawValue());
    }
  }
}

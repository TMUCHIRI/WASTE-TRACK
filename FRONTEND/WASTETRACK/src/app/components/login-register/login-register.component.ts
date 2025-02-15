import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  isSignUp = false;

  // Toggle between Sign In and Sign Up forms
  toggleForm() {
    this.isSignUp = !this.isSignUp;
  }

  // Handle Sign In Form Submission
  onLoginSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Login Form Submitted', form.value);
      // Handle login logic here
    }
  }

  // Handle Sign Up Form Submission
  onRegisterSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Register Form Submitted', form.value);
      // Handle registration logic here
    }
  }
}

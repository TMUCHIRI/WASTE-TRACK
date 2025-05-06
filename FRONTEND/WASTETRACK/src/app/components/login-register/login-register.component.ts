// login-register.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  isSignUp = false;
  loginError: string | null = null;
  registerError: string | null = null;
  registerSuccess: string | null = null; // Added to show success message

  constructor(private authService: AuthService) { }

  // Toggle between Sign In and Sign Up forms
  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.loginError = null;
    this.registerError = null;
    this.registerSuccess = null;
  }

  // Handle Sign In Form Submission
  onLoginSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login subscription next:', response); // Log the response here too
          this.loginError = null;
          console.log('Login successful');
        },
        error: (err) => {
          this.loginError = err.message || 'Login failed. Please check your credentials.';
          console.error('Login error:', err);
        },
        complete: () => {
          console.log('Login subscription completed');
        }
      });
    }
  }

  // Handle Sign Up Form Submission
  onRegisterSubmit(form: NgForm) {
    if (form.valid) {
      const { name, email, password } = form.value;
      this.authService.register(name, email, password).subscribe({
        next: (response) => {
          this.registerError = null;
          this.registerSuccess = 'Registration successful! Please sign in.';
          console.log('Registration successful', response);
          // Switch to login form after a short delay
          setTimeout(() => {
            this.isSignUp = false;
            this.registerSuccess = null;
          }, 2000); // Show success message for 2 seconds
        },
        error: (err) => {
          this.registerError = err.message || 'Registration failed. Please try again.';
          console.error('Registration error:', err);
        }
      });
    }
  }
}
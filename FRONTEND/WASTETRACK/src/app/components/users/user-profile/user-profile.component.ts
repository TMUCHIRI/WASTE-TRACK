import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  isUpdateFormOpen = false;
  isDisableModalOpen = false;
  username: string | null = null;
  email: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  // Load user profile data from localStorage
  private loadUserProfile() {
    this.username = localStorage.getItem('username'); // Assuming stored during login
    this.email = localStorage.getItem('email'); // Assuming stored during login
    if (!this.email) {
      this.errorMessage = 'User data not found. Please log in again.';
    }
  }

  openUpdateForm() {
    this.isUpdateFormOpen = true;
    this.successMessage = null;
    this.errorMessage = null;
  }

  closeUpdateForm() {
    this.isUpdateFormOpen = false;
  }

  onUpdateSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.updateProfile(email, password).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          this.errorMessage = null;
          localStorage.setItem('email', email); // Update stored email
          this.email = email; // Update displayed email
          this.closeUpdateForm();
        },
        error: (err) => {
          this.errorMessage = err.message || 'Failed to update profile.';
          this.successMessage = null;
          console.error('Update profile error:', err);
        }
      });
    }
  }

  openDisableModal() {
    this.isDisableModalOpen = true;
    this.successMessage = null;
    this.errorMessage = null;
  }

  closeDisableModal() {
    this.isDisableModalOpen = false;
  }

  disableAccount() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.errorMessage = 'User ID not found. Please log in again.';
      return;
    }

    this.authService.deactivateAccount(userId).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        this.closeDisableModal();
        this.authService.logout(); // Log out after deactivation
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to disable account.';
        this.successMessage = null;
        console.error('Disable account error:', err);
      }
    });
  }
}

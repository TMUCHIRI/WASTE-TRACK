import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  isUpdateFormOpen = false;
  isDisableModalOpen = false;
  isCollectorRequestModalOpen = false;

  // Open Update Profile Form
  openUpdateForm() {
    this.isUpdateFormOpen = true;
  }

  // Close Update Profile Form
  closeUpdateForm() {
    this.isUpdateFormOpen = false;
  }

  // Handle Update Profile Form Submission
  onUpdateSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted', form.value);
      // Handle form submission logic here
      this.closeUpdateForm();
    }
  }

  // Open Disable Account Modal
  openDisableModal() {
    this.isDisableModalOpen = true;
  }

  // Close Disable Account Modal
  closeDisableModal() {
    this.isDisableModalOpen = false;
  }

  // Handle Disable Account Action
  disableAccount() {
    console.log('Account Disabled');
    // Handle account disabling logic here
    this.closeDisableModal();
  }

  // Open Collector Request Modal
  openCollectorRequestModal() {
    this.isCollectorRequestModalOpen = true;
  }

  // Close Collector Request Modal
  closeCollectorRequestModal() {
    this.isCollectorRequestModalOpen = false;
  }

  // Send Collector Request
  sendCollectorRequest() {
    console.log('Request to become a collector sent.');
    this.closeCollectorRequestModal();
  }
}

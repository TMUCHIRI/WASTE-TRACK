import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  isFormOpen = false;

  // Open the form modal
  openForm() {
    this.isFormOpen = true;
  }

  // Close the form modal
  closeForm() {
    this.isFormOpen = false;
  }

  // Handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted', form.value);
      // Handle form submission logic here
      this.closeForm(); // Close the form after submission
    }
  }
}

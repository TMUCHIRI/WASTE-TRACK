import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-collector-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './collector-profile.component.html',
  styleUrl: './collector-profile.component.css'
})
export class CollectorProfileComponent {
  isUpdateFormOpen = false;
  isDisableModalOpen = false;
  isRoleChangeModalOpen = false;

  openUpdateForm() {
      this.isUpdateFormOpen = true;
  }

  closeUpdateForm() {
      this.isUpdateFormOpen = false;
  }

  openDisableModal() {
      this.isDisableModalOpen = true;
  }

  closeDisableModal() {
      this.isDisableModalOpen = false;
  }

  disableAccount() {
      console.log("Account disabled");
      this.closeDisableModal();
  }

  openRoleChangeModal() {
      this.isRoleChangeModalOpen = true;
  }

  closeRoleChangeModal() {
      this.isRoleChangeModalOpen = false;
  }

  sendRoleChangeRequest() {
      console.log("Role change request sent to admin");
      this.closeRoleChangeModal();
  }

  onUpdateSubmit(form: NgForm) {
    if (form.valid) {
        console.log("Profile updated:", form.value);
        // You can send the updated data to your backend here
        this.closeUpdateForm();
    } else {
        console.log("Invalid form submission.");
    }
}

}

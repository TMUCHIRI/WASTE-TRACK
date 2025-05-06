// user-dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PickupService } from '../../../services/pickup/pickup.service';
import { Pickup } from '../../../interfaces/pickup';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  isFormOpen = false;
  pickups: Pickup[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private pickupService: PickupService) {}

  ngOnInit() {
    this.loadAllPickups();
  }

  openForm() {
    this.isFormOpen = true;
    this.successMessage = null;
    this.errorMessage = null;
  }

  closeForm() {
    this.isFormOpen = false;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        this.errorMessage = 'User ID not found in local storage. Please log in again.';
        return;
      }

      const { date, location, phone, category } = form.value;
      const formattedDate = new Date(date).toISOString();

      const pickupData = {
        location,
        date: formattedDate,
        phone_number: phone,
        category
      };

      this.pickupService.createPickup(userId, pickupData).subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Pickup scheduled successfully.';
          this.errorMessage = null;
          this.pickups.push(response.pickup); // Add immediately
          this.closeForm();
          form.resetForm();
        },
        error: (err) => {
          this.errorMessage = err.message || 'Failed to schedule pickup.';
          this.successMessage = null;
          console.error('Pickup error:', err);
        }
      });
    }
  }

  private loadAllPickups() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.errorMessage = 'User ID not found in local storage. Please log in again.';
      return;
    }

    this.pickupService.getActivePickups(userId).subscribe({
      next: (pickups) => {
        this.pickups = pickups || [];
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load pickups.';
        console.error('Load pickups error:', err);
      }
    });
  }
}
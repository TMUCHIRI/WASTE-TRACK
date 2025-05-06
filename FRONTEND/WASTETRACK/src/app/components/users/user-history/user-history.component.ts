import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PickupService } from '../../../services/pickup/pickup.service';

interface Pickup {
  id: string;
  date: string;
  collector: string;
  category: string;
  status: string;
}

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  pickups: Pickup[] = [];
  errorMessage: string | null = null;

  constructor(private pickupService: PickupService) {}

  ngOnInit() {
    this.loadPickupHistory();
  }

  private loadPickupHistory() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.errorMessage = 'User ID not found. Please log in again.';
      return;
    }

    this.pickupService.getUserPickupHistory(userId).subscribe({
      next: (response) => {
        this.pickups = response.pickups;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load pickup history.';
        console.error('Load pickup history error:', err);
      }
    });
  }
}
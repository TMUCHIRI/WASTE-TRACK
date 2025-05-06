import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../services/collection/collection.service';

interface Pickup {
  pickup_id: string;
  location: string;
  date: string;
  phone_number: string;
  category: string;
  status: boolean;
  user_id: string;
}

@Component({
  selector: 'app-collector-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collector-requests.component.html',
  styleUrls: ['./collector-requests.component.css']
})
export class CollectorRequestsComponent implements OnInit {
  pickups: Pickup[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.loadPickups();
  }

  // Fetch all pickups
  private loadPickups() {
    this.collectionService.getAllPickups().subscribe({
      next: (response) => {
        this.pickups = response.pickups.filter((pickup: Pickup) => pickup.status); // Only active pickups
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load pickups.';
        console.error('Load pickups error:', err);
      }
    });
  }

  // Accept a pickup
  acceptPickup(pickupId: string) {
    const userId = localStorage.getItem('user_id'); // Collector's ID
    if (!userId) {
      this.errorMessage = 'Collector ID not found. Please log in again.';
      return;
    }

    this.collectionService.acceptPickup(userId, pickupId).subscribe({
      next: (response) => {
        // Show success message for 3 seconds
        this.successMessage = response.message || 'Pickup accepted successfully.';
        this.errorMessage = null;
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);

        // Remove the pickup from the list immediately
        this.pickups = this.pickups.filter(pickup => pickup.pickup_id !== pickupId);

        // Note: The pickup should now appear in CollectorHistoryComponent due to backend update
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to accept pickup.';
        this.successMessage = null;
        console.error('Accept pickup error:', err);
      }
    });
  }
}
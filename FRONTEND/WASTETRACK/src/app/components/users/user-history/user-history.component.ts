import { Component, OnInit } from '@angular/core';
import { PickupService } from '../../../services/pickup/pickup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-history',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent implements OnInit {
  pickups: any[] = [];

  constructor(private pickupService: PickupService) {}

  ngOnInit(): void {
    this.loadPickups();
  }

  loadPickups(): void {
    this.pickupService.getPickups().subscribe((data: any[]) => {
      // Filter pickups that are either collected or rejected
      this.pickups = data.filter(pickup => pickup.status === 'collected' || pickup.status === 'rejected');
    });
  }
}

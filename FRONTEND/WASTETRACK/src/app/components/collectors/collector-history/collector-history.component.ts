import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../services/collection/collection.service';

interface Collection {
  collection_id: string;
  pickup_id: string;
  collector_name: string;
  pickup_date: string; // Already present and matches "DD-MM-YYYY" format
  category: string;
  status: number;
  username: string;
  email: string;
  location: string;
}

@Component({
  selector: 'app-collector-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collector-history.component.html',
  styleUrls: ['./collector-history.component.css']
})
export class CollectorHistoryComponent implements OnInit {
  collections: Collection[] = [];
  errorMessage: string | null = null;

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.loadCollections();
  }

  private loadCollections() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.errorMessage = 'Collector ID not found. Please log in again.';
      return;
    }

    this.collectionService.getCollectorCollections(userId).subscribe({
      next: (response) => {
        this.collections = response.collections;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load collection history.';
        console.error('Load collections error:', err);
      }
    });
  }
}
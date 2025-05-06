import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../services/collection/collection.service';


interface CategoryStat {
  category: string;
  count: number;
}

@Component({
  selector: 'app-collector-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collector-dashboard.component.html',
  styleUrls: ['./collector-dashboard.component.css']
})
export class CollectorDashboardComponent implements OnInit {
  pendingRequests = 0;
  completedRequests = 0;
  categoryStats: CategoryStat[] = [];
  errorMessage: string | null = null;

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  private loadAnalytics() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.errorMessage = 'Collector ID not found. Please log in again.';
      return;
    }

    this.collectionService.getCollectorAnalytics(userId).subscribe({
      next: (response) => {
        this.pendingRequests = response.pending_requests;
        this.completedRequests = response.completed_requests;
        this.categoryStats = response.category_stats;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load analytics.';
        console.error('Load analytics error:', err);
      }
    });
  }
}

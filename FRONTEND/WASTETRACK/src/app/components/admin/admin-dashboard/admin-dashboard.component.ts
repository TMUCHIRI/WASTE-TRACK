import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

interface CategoryStat {
  category: string;
  count: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalRequests = 0;
  pendingRequests = 0;
  completedRequests = 0;
  totalCollectors = 0;
  totalUsers = 0;
  categoryStats: CategoryStat[] = [];
  errorMessage: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  private loadAnalytics() {
    this.adminService.getAdminAnalytics().subscribe({
      next: (response) => {
        this.totalRequests = response.total_requests;
        this.pendingRequests = response.pending_requests;
        this.completedRequests = response.completed_requests;
        this.totalCollectors = response.total_collectors;
        this.totalUsers = response.total_users;
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

interface User {
  user_id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService) {
    console.log('AuthService injected:', this.authService);
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        this.filteredUsers = this.users.filter(user => 
          user.role === 'user' || user.role === 'collector'
        );
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load users.';
        console.error('Load users error:', err);
      }
    });
  }

  toggleUserStatus(user: User) {
    console.log('Toggle called with AuthService:', this.authService);
    console.log('HttpClient:', this.authService['http']);
    const action = user.isActive 
      ? this.authService.deactivateAccount.bind(this.authService) 
      : this.authService.activateUser.bind(this.authService);
    action(user.user_id).subscribe({
      next: (response) => {
        this.successMessage = response.message || `User ${user.isActive ? 'deactivated' : 'activated'} successfully.`;
        this.errorMessage = null;
        user.isActive = !user.isActive;
      },
      error: (err) => {
        this.errorMessage = err.message || `Failed to ${user.isActive ? 'deactivate' : 'activate'} user.`;
        this.successMessage = null;
        console.error('Toggle status error:', err);
      }
    });
  }
}
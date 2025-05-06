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
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        // Filter to include only 'user' and 'collector' roles
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

  toggleUserRole(user: User) {
    const observable = user.role === 'user' 
      ? this.authService.switchToCollector(user.user_id) 
      : this.authService.revokePrivileges(user.user_id);
    observable.subscribe({
      next: (response) => {
        this.successMessage = response.message || `User role changed to ${user.role === 'user' ? 'collector' : 'user'} successfully.`;
        this.errorMessage = null;
        user.role = user.role === 'user' ? 'collector' : 'user'; // Update role locally
      },
      error: (err) => {
        this.errorMessage = err.message || `Failed to change user role to ${user.role === 'user' ? 'collector' : 'user'}.`;
        this.successMessage = null;
        console.error('Toggle role error:', err);
      }
    });
  }
}
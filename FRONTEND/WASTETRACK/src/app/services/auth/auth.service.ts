// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5800/users';
  private tokenKey = 'auth_token';
  private roleKey = 'user_role';
  private userIdKey = 'user_id'; // Key for storing user_id
  private username = 'username'

  constructor(private http: HttpClient, private router: Router) { }

  // Register a new user
  register(username: string, email: string, password: string): Observable<any> {
    const payload = { username, email, password };
    return this.http.post(`${this.baseUrl}/register`, payload).pipe(
      tap(response => console.log('Registration successful', response)),
      catchError(this.handleError)
    );
  }

  // Login an existing user
  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.baseUrl}/login`, payload).pipe(
      tap((response: any) => {
        console.log('Login response:', response); // Log the full response
        if (response && response.token && response.role) {
          console.log('Storing token:', response.token);
          localStorage.setItem(this.tokenKey, response.token);
          console.log('Storing role:', response.role);
          localStorage.setItem(this.roleKey, response.role);
          console.log('Storing user_id:', response.user_id);
          localStorage.setItem(this.userIdKey, response.user_id || response.userId || response.id); // Store user_id
          localStorage.setItem(this.username, response.username)
          localStorage.setItem('email', email);
          this.routeToDashboard(response.role);
        } else {
          console.error('Invalid response: missing token or role', response);
          throw new Error('Invalid login response: missing token or role');
        }
      }),
      catchError(this.handleError)
    );
  }

   // Update user profile
   updateProfile(email: string, password: string): Observable<any> {
    const payload = { password }; // Profile picture is optional and omitted
    return this.http.put(`${this.baseUrl}/${email}`, payload).pipe(
      tap((response: any) => {
        console.log('Profile update response:', response);
      }),
      catchError(this.handleError)
    );
  }

  getAllUsers(): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get(`${this.baseUrl}/fetch-all-users`, { headers }).pipe(
      tap((response: any) => console.log('Fetched all users:', response)),
      catchError(this.handleError)
    );
  }

  // Activate user account
  activateUser(userId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.patch(`${this.baseUrl}/activateUser/${userId}`, {}, { headers }).pipe(
      tap((response: any) => console.log('Activate user response:', response)),
      catchError(this.handleError)
    );
  }

  // Deactivate user account
  deactivateAccount(userId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.patch(`${this.baseUrl}/deactivateUser/${userId}`, {}, { headers }).pipe(
      tap((response: any) => console.log('Deactivate account response:', response)),
      catchError(this.handleError)
    );
  }

  switchToCollector(userId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.patch(`${this.baseUrl}/switchManagerRole/${userId}`, {}, { headers }).pipe(
      tap((response: any) => console.log('Switch to collector response:', response)),
      catchError(this.handleError)
    );
  }

  // Revoke privileges (revert to user)
  revokePrivileges(userId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.patch(`${this.baseUrl}/revokePrivileges/${userId}`, {}, { headers }).pipe(
      tap((response: any) => console.log('Revoke privileges response:', response)),
      catchError(this.handleError)
    );
  }

  // Get the stored user_id
  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Get the stored role
  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem('username'); // Clear username
    localStorage.removeItem('email'); // Clear email
    this.router.navigate(['/login']);
  }

  // Redirect to login page
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Route to appropriate dashboard based on role
  private routeToDashboard(role: string): void {
    switch (role.toLowerCase()) {
      case 'user':
        this.router.navigate(['/users/user-dashboard']);
        break;
      case 'collector':
        this.router.navigate(['/collectors/collector-dashboard']);
        break;
      case 'admin':
        this.router.navigate(['/admin/admin-dashboard']);
        break;
      default:
        console.error('Unknown role:', role);
        this.router.navigate(['/login']);
    }
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage += `\nServer Message: ${error.error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
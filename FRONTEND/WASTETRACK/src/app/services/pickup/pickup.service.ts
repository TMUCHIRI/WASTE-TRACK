import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PickupService {
  private baseUrl = 'http://localhost:5800/pickups';

  constructor(
    private http: HttpClient
  ) {}

  // Schedule a new pickup
  createPickup(userId: string, pickup: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Keep token for consistency, though not checked
    });
    return this.http.post(`${this.baseUrl}/${userId}/createPickup`, pickup, { headers });
  }

  getActivePickups(userId: string): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any[]>(`${this.baseUrl}/active/${userId}`, { headers });
  }

  getUserPickupHistory(userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseUrl}/history/${userId}`, { headers });
  }
}

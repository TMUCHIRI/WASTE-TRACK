import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private pickupsUrl = 'http://localhost:5800/pickups';
  private collectionsUrl = 'http://localhost:5800/collections';

  constructor(private http: HttpClient) {}

  // Fetch all pickups
  getAllPickups(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.pickupsUrl}/fetch-all-pickups`, { headers });
  }

  // Accept a pickup
  acceptPickup(userId: string, pickupId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const payload = { user_id: userId, pickup_id: pickupId };
    return this.http.post(`${this.collectionsUrl}/accept-pickup`, payload, { headers });
  }

  getCollectorCollections(userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.collectionsUrl}/${userId}/collections`, { headers });
  }

  getCollectorAnalytics(userId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.collectionsUrl}/${userId}/analytics`, { headers });
  }
}

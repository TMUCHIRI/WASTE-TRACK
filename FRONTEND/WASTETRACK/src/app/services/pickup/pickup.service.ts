import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickupService {
  constructor(private http: HttpClient) {}

  getPickups(): Observable<any[]> {
    return this.http.get<any[]>('api/pickups');
  }
}

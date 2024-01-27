// track-delete.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackDeleteService {
  private apiUrl = 'http://your-api-endpoint'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  deleteTrack(trackId: number): Observable<any> {
    const headers = new HttpHeaders({
      // Add any necessary headers here
    });

    // Adjust the endpoint and HTTP method based on your API
    return this.http.delete(`${this.apiUrl}/delete-track/${trackId}`, { headers });
  }
}

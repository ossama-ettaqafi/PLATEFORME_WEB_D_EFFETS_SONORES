import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackUploadService {
  private apiUrl = 'http://your-laravel-api-endpoint'; // Replace with your Laravel API endpoint

  constructor(private http: HttpClient) {}

  uploadTrack(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Adjust the endpoint and HTTP method based on your Laravel API
    return this.http.post(`${this.apiUrl}/upload-track`, formData, { headers });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackUploadService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  uploadTrack(formData: FormData): Observable<any> {
    // Adjust the endpoint and HTTP method based on your Laravel API
    return this.http.post(`${this.apiUrl}/track/store`, formData);
  }
}

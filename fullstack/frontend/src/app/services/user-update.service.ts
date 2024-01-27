// user-update.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  private apiUrl = 'http://your-api-endpoint'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  updateUser(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      // Add any necessary headers here
    });

    // Adjust the endpoint and HTTP method based on your API
    return this.http.put(`${this.apiUrl}/update-user`, formData, { headers });
  }
}

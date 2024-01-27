import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormData } from '../components/pages/auth/register-page/register-page.component';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://your-laravel-api-endpoint'; // Replace with your Laravel API endpoint

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // You may need to adjust the endpoint and HTTP method based on your Laravel API
    return this.http.post(`${this.apiUrl}/register`, formData, { headers });
  }
}

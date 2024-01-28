import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();

    return this.http.post<any>(`${this.apiUrl}/user/register`, formData, {
      headers,
    });
  }
}

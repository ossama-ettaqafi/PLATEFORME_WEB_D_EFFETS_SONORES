// user-update.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  updateUser(userId: number, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({

    });

    return this.http.put(`${this.apiUrl}/user/update/${userId}`, formData, { headers });
  }
}

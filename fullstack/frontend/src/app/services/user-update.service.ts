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

  updateUser(
    userId: number,
    userData: any,
    file: File | null
  ): Observable<any> {
    const url = `${this.apiUrl}/user/update/${userId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // For JSON requests
      'Accept': 'application/json',
    });


    const formData = new FormData();

    // Append known form data fields
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('bio', userData.bio);
    formData.append('country', userData.country);
    formData.append('city', userData.city);

    // Append the image file if available
    if (file !== null) formData.append('image_file', file);

    return this.http.post(url, formData);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadUserImageService {

  private baseUrl = 'assets';

  constructor(private http: HttpClient) { }

  uploadUserImage(file: File, userId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const uploadUrl = `${this.baseUrl}/users-image/${userId}`; // Adjust the endpoint based on your server implementation

    return this.http.post(uploadUrl, formData);
  }
}

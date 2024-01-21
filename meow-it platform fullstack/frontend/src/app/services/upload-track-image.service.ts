import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'assets'; // Assuming your assets folder is in the root of the project

  constructor(private http: HttpClient) { }

  uploadFile(file: File, userId: string, trackId: string): Observable<any> {
    const userTrackPath = `/${userId}/${trackId}/`;
    const uploadPath = `${this.baseUrl}${userTrackPath}`;

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Adjust the endpoint based on your server implementation
    const uploadUrl = `${uploadPath}/upload`; // Adjust the endpoint based on your server implementation

    // Simulate creating directories on the client side
    this.createDirectories(userId, trackId);

    // Use HttpClient to make a POST request to your server
    return this.http.post(uploadUrl, formData);
  }

  private createDirectories(userId: string, trackId: string): void {
    // Simulate creating directories on the client side
    // You may need to adjust this based on your application structure
    const userPath = `${this.baseUrl}/${userId}`;
    const trackPath = `${userPath}/${trackId}`;

    if (!this.directoryExists(userPath)) {
      this.createDirectory(userPath);
    }

    if (!this.directoryExists(trackPath)) {
      this.createDirectory(trackPath);
    }
  }

  private directoryExists(path: string): boolean {
    // Simulate checking if a directory exists on the client side
    // You may need to adjust this based on your application structure
    return true; // Adjust this based on your logic
  }

  private createDirectory(path: string): void {
    // Simulate creating a directory on the client side
    // You may need to adjust this based on your application structure
    console.log(`Creating directory: ${path}`);
  }
}

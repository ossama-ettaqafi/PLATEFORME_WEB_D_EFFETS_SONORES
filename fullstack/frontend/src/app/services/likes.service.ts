import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Update the base API URL

  constructor(
    private http: HttpClient
  ) {}

  getLikes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all-likes`);
  }

  likeTrack(userId: number, trackId: number): Observable<any> {
    const newLike = { user_id: userId, track_id: trackId };

    return this.http.post<any>(`${this.apiUrl}/like`, newLike);
  }

  dislikeTrack(userId: number, trackId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/like/${userId}/${trackId}`);
  }
}

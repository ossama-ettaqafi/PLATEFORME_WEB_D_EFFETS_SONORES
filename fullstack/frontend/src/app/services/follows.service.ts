import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class FollowsService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private followsData: any[] | null = null; // Initialize as null

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getFollows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all-follows`);
  }

  followUser(followerId: number, followingId: number): Observable<any> {
    const putUrl = `${this.apiUrl}/follow`; // Replace with your actual follow endpoint

    // Assuming your server supports PUT requests for following
    return this.http.post<any>(putUrl, {
      follower_id: followerId,
      following_id: followingId,
    });
  }

  unfollowUser(followerId: number, followingId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/unfollow/${followerId}/${followingId}`;

    return this.http.delete<any>(deleteUrl);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class FollowsService {
  private apiUrl = 'assets/api/data/follows.json';
  private followsData: any[] | null = null; // Initialize as null

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getFollows(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  followUser(followerId: number, followingId: number): Observable<any> {
    const putUrl = `${this.apiUrl}/follow`; // Replace with your actual follow endpoint

    // Assuming your server supports PUT requests for following
    return this.http.put<any>(putUrl, {
      follower_id: followerId,
      following_id: followingId,
    }).pipe(
      // Add notification after successfully following
      tap(() => this.notificationsService.addNotification(followingId, followerId, 1))
    );
  }

  unfollowUser(followerId: number, followingId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/unfollow`;

    return this.http.delete<any>(deleteUrl, {
      params: {
        followerId: followerId.toString(),
        followingId: followingId.toString(),
      },
    }).pipe(
      // Delete notification after successfully unfollowing
      switchMap(() => this.notificationsService.getNotifications()),
      map(notifications => notifications.find(notification =>
        notification.user_id === followingId && notification.sender_id === followerId
      )),
      filter(notification => !!notification),
      switchMap(notification => this.notificationsService.deleteNotification(notification.id))
    );
  }
}

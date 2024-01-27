import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private apiUrl = 'assets/api/data/notifications.json';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addNotification(
    userId: number,
    senderId: number,
    notificationType: number
  ): Observable<any> {
    const newNotification = {
      user_id: userId,
      sender_id: senderId,
      notification_type: notificationType,
    };

    return this.http.post<any>(this.apiUrl, newNotification);
  }

  deleteNotification(notificationId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${notificationId}`;

    return this.http.delete<any>(deleteUrl);
  }
}

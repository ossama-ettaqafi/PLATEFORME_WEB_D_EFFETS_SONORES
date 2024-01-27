import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowsService {
  private apiUrl = 'assets/api/data/follows.json';
  private followsData: any[] | null = null; // Initialize as null

  constructor(private http: HttpClient) {}

  getFollows(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  followUser(followerId: number, followingId: number): Observable<any> {
    const putUrl = `${this.apiUrl}/follow`; // Replace with your actual follow endpoint

    // Assuming your server supports PUT requests for following
    return this.http.put<any>(putUrl, {
      follower_id: followerId,
      following_id: followingId,
    });
  }

  unfollowUser(followerId: number, followingId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/unfollow`; // Replace with your actual unfollow endpoint

    // Assuming your server supports DELETE requests for unfollowing
    return this.http.delete<any>(deleteUrl, {
      params: {
        followerId: followerId.toString(),
        followingId: followingId.toString(),
      },
    });
  }
}

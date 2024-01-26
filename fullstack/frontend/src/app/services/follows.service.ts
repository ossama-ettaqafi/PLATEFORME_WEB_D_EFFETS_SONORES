import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowsService {
  private apiUrl = 'assets/api/data/follows.json';

  constructor(private http: HttpClient) {}

  getFollows(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  follow(followerId: number, followingId: number): void {
    console.log(`User ${followerId} follows the user ${followingId}`);
    // Add your logic to perform the follow action, e.g., make an API call to the server
  }

  isFollowing(followerId: number, followingId: number): boolean {

    return true;

  }
}

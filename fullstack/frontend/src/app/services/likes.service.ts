import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private apiUrl = 'assets/api/data/likes.json';
  private likesData: any[] = [];  // Maintain a local copy of likes data

  constructor(private http: HttpClient) { }

  getLikes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  likeTrack(userId: number, trackId: number): Observable<any> {
    // Simulate server call to add a like
    const newLike = { user_id: userId, track_id: trackId };
    this.likesData.push(newLike);  // Update local data
    return this.http.post<any>(this.apiUrl, newLike);  // Update server data
  }

  dislikeTrack(userId: number, trackId: number): Observable<any> {
    // Simulate server call to remove a like
    const index = this.likesData.findIndex(like => like.user_id === userId && like.track_id === trackId);
    if (index !== -1) {
      this.likesData.splice(index, 1);  // Update local data
    }
    return this.http.delete<any>(`${this.apiUrl}/${userId}/${trackId}`);  // Update server data
  }
}

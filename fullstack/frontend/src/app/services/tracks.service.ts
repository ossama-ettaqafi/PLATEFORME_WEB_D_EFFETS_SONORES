import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private apiUrl = 'http://127.0.0.1:8000/api/all-tracks';
  private tracksIds: string[] = [];


  constructor(private http: HttpClient) {
    this.fetchTracksIds();
  }

  getTracks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTracksIds(): string[] {
    return this.tracksIds;
  }

  getTrackById(trackId: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(tracks => tracks.find(track => track.id.toString() === trackId))
    );
  }

  private fetchTracksIds() {
    this.getTracks().subscribe(tracks => {
      this.tracksIds = tracks.map(track => track.id.toString());
    });
  }

}

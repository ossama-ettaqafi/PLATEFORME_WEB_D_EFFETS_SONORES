import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private apiUrl = 'assets/api/data/tracks.json';
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private apiUrl = '/api/data/tracks.json';

  constructor(private http: HttpClient) { }

  getTracks(): Observable<any[]> {
    console.log(this.http.get<any[]>(this.apiUrl));
    return this.http.get<any[]>(this.apiUrl);
  }
}

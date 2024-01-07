import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowsService {
  private apiUrl = '/api/data/follows.json';

  constructor(private http: HttpClient) { }

  getFollows(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

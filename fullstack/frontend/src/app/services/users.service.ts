import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'assets/api/data/users.json';
  private usersIds: string[] = [];

  constructor(private http: HttpClient) {
    this.fetchUsersIds();
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsersIds(): string[] {
    return this.usersIds;
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.id.toString() === userId))
    );
  }

  private fetchUsersIds() {
    this.getUsers().subscribe(users => {
      this.usersIds = users.map(user => user.id.toString());
    });
  }
}

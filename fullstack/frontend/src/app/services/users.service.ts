import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:8000/users';
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

  private fetchUsersIds() {
    this.getUsers().subscribe(users => {
      this.usersIds = users.map(user => user.id.toString());
    });
  }

}


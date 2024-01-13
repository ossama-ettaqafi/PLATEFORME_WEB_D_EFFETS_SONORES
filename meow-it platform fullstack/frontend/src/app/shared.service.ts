import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private SESSION_KEY = 'loggedUserId';

  setLoggedInUserId(userId: number): void {
    sessionStorage.setItem(this.SESSION_KEY, userId.toString());
  }

  getLoggedInUserId(): number | null {
    const userIdString = sessionStorage.getItem(this.SESSION_KEY);
    return userIdString ? +userIdString : null;
  }
}

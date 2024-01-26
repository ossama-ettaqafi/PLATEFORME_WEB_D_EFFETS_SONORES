import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private SESSION_KEY = 'loggedUserId';

  setLoggedInUserId(userId: number | null): void {
    const userIdString = userId ?? ''
    sessionStorage.setItem(this.SESSION_KEY, userIdString.toString());
  }

  getLoggedInUserId(): number | null {
    const userIdString = sessionStorage.getItem(this.SESSION_KEY);
    return userIdString ? +userIdString : null;
  }

  isLoggedIn(): boolean {
    return this.getLoggedInUserId() !== null;
  }
}

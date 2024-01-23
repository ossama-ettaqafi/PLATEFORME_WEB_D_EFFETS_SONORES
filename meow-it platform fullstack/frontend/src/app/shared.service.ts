import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private SESSION_KEY = 'loggedUserId';
  private PLAYED_TRACK = 'playedTrackId';

  setLoggedInUserId(userId: number): void {
    sessionStorage.setItem(this.SESSION_KEY, userId.toString());
  }

  getLoggedInUserId(): number | null {
    const userIdString = sessionStorage.getItem(this.SESSION_KEY);
    return userIdString ? +userIdString : null;
  }

  setPlayedTrackId(trackId: number): void {
    sessionStorage.setItem(this.PLAYED_TRACK, trackId.toString());
  }

  getPlayedTrackId(): number | null {
    const trackIdString = sessionStorage.getItem(this.PLAYED_TRACK);
    return trackIdString ? +trackIdString : null;
  }
}

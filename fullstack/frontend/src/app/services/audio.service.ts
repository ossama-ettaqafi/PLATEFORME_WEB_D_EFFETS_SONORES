import { EventEmitter, Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public trackData: any;
  public artist:any;
  public hasLiked: boolean | undefined;

  audio: HTMLAudioElement = new Audio();
  pausedTime = 0;

  onTimeUpdate: EventEmitter<void> = new EventEmitter<void>();

  constructor(public usersService: UsersService) {}

  setLike(isLiked: boolean):void{
    this.hasLiked = isLiked;
  }

  getLikeStats(): boolean | undefined{
    return this.hasLiked;
  }

  playAudio(trackData: any): void {
    if (this.audio.src != trackData.trackURL && this.audio) {
      this.audio.src = trackData.trackURL;
      this.audio.load();
    }

    this.trackData = trackData;
    this.extractUserFromService().subscribe((user) => {
      this.artist = user;
      this.audio.currentTime = this.pausedTime;
      this.audio.play();
    });
  }

  pauseAudio(): void {
    this.audio.pause();
    this.pausedTime = this.audio.currentTime;
  }

  isAudioPlaying(url: string): boolean {
    const sanitizedCurrentSrc = this.audio.src.replace(
      window.location.origin,
      ''
    );

    return sanitizedCurrentSrc.endsWith(url) && !this.audio.paused;
  }

  isGlobalAudioPlaying(): boolean {
    return !this.audio.paused;
  }

  playGlobal(): void {
    this.audio.currentTime = this.pausedTime;
    this.audio.play();
  }

  getAudioTime(): number {
    return this.audio.currentTime;
  }

  getAudioDuration(): number {
    return isFinite(this.audio.duration) ? this.audio.duration : 0;
  }

  downloadCurrentTrack(trackData: any): void {
    const link = document.createElement('a');
    link.href = trackData.trackURL;
    // link.download = `${this.artist.name} - ${trackData.title}.mp3`;
    link.click();
  }

  checkAudio(): string {
    return this.audio.src;
  }

  extractUserFromService(): Observable<any> {
    return this.usersService.getUsers().pipe(
      map((users) =>
        users.find((user) => user.id == this.trackData.user_id)
      )
    );
  }

  initAudioEventListeners(): void {
    this.audio.addEventListener('loadedmetadata', () => {
      // You can optionally emit an event or update other properties here
    });

    // Add an event listener for time updates
    this.audio.addEventListener('timeupdate', () => {
      this.onTimeUpdate.emit();
    });
  }
}

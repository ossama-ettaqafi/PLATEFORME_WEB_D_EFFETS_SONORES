import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audio: HTMLAudioElement = new Audio();
  pausedTime = 0;

  onTimeUpdate: EventEmitter<void> = new EventEmitter<void>();

  playAudio(url: string): void {
    if (this.audio.src !== url) {
      this.audio.src = url;
      this.audio.load();
    }

    this.audio.currentTime = this.pausedTime;
    this.audio.play();
  }

  pauseAudio(): void {
    this.audio.pause();
    this.pausedTime = this.audio.currentTime;
  }

  isAudioPlaying(url: string): boolean {
    const sanitizedCurrentSrc = this.audio.src.replace(window.location.origin, '');

    return sanitizedCurrentSrc.endsWith(url) && !this.audio.paused;
  }


  isGlobalAudioPlaying(): boolean {
    return !this.audio.paused;
  }

  playGlobal():void{
    this.audio.currentTime = this.pausedTime;
    this.audio.play();
  }

  getAudioTime(): number {
    return this.audio.currentTime;
  }

  getAudioDuration(): number {
    return this.audio.duration;
  }

  downloadCurrentTrack(trackData:any): void {
    const link = document.createElement('a');
    link.href = trackData.trackURL;
    // link.download = `${trackData.title}.mp3`;
    console.log(link);
    link.click();
  }

  checkAudio():string{
    return this.audio.src;
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

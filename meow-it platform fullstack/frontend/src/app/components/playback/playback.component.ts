import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css'],
})
export class PlaybackComponent implements OnInit {
  public currentTrack: string = 'Current Track Name';
  public artistName: string = 'Artist Name';
  public imageURL: string = 'assets/images/def/test-image.jpg';

  constructor(public audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.initAudioEventListeners();
  }

  playGlobal(): void {
    this.audioService.playGlobal();
  }

  pauseGlobal(): void {
    this.audioService.pauseAudio();
  }

  getAudioTime(): number {
    return this.audioService.getAudioTime();
  }

  getAudioDuration(): number {
    return this.audioService.getAudioDuration();
  }

  ngOnDestroy(): void {
    this.audioService.onTimeUpdate.unsubscribe();
  }
}

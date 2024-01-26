import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css'],
})
export class PlaybackComponent implements OnInit {
  public currentTrack: string = 'Current Track Name';
  public artistName: string = 'Artist Name';
  public imageURL: string = 'assets/images/def/test-image.jpg';

  constructor(public audioService: AudioService,
    public usersService:UsersService) {}

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

  getValidAudioDuration(): number {
    const duration = this.audioService.getAudioDuration();
    return isFinite(duration) ? duration : 0;
  }


  ngOnDestroy(): void {
    this.audioService.onTimeUpdate.unsubscribe();
  }

}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css']
})
export class TrackCardComponent implements OnInit, OnDestroy {
  @Input() public trackData:any;
  @Input() public user:any;

  constructor(public audioService: AudioService) {}

  ngOnInit(): void {

  }

  play(trackURL: string): void {
    this.audioService.playAudio(trackURL);
    console.log(trackURL);
  }

  pause(): void {
    this.audioService.pauseAudio();
  }

  getAudioTime(): number {
    return this.audioService.getAudioTime();
  }

  getAudioDuration(): number {
    return this.audioService.getAudioDuration();
  }

  download(): void {
    this.audioService.downloadCurrentTrack(this.trackData);
  }

  ngOnDestroy(): void {
    this.audioService.onTimeUpdate.unsubscribe();
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { LikesService } from 'src/app/services/likes.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css'],
})
export class TrackCardComponent implements OnInit, OnDestroy {
  @Input() public trackData: any;
  @Input() public user: any;
  public hasLiked: boolean | undefined;
  public userId: number | null | undefined;
  isLiked: boolean | undefined;

  constructor(
    public audioService: AudioService,
    private likesService: LikesService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userId = this.sharedService.getLoggedInUserId();
    this.checkIfLiked();

    this.likesService.getLikes().subscribe(likesData => {
      this.isLiked = !!likesData.find(like => like.user_id === this.userId && like.track_id === this.trackData.id);
    });
  }

  likeTrack(): void {
    if (this.userId !== null && this.userId !== undefined && this.trackData.id !== undefined) {
      this.likesService.likeTrack(this.userId, this.trackData.id).subscribe(
        response => {
          this.isLiked = true;
          // console.log('Like operation successful:', response);
          // console.log('isLiked:', this.isLiked);
        },
        error => {
          console.error('Error during like operation:', error);
        }
      );
    }
  }

  dislikeTrack(): void {
    if (this.userId !== null && this.userId !== undefined && this.trackData.id !== undefined) {
      this.likesService.dislikeTrack(this.userId, this.trackData.id).subscribe(
        response => {
          this.isLiked = false;
          // console.log('Dislike operation successful:', response);
          // console.log('isLiked:', this.isLiked);
        },
        error => {
          console.error('Error during dislike operation:', error);
        }
      );
    }
  }

  checkIfLiked(): void {
    this.likesService.getLikes().subscribe((likesData: any[]) => {
      const likedEntry = likesData.find(
        (entry) =>
          entry.user_id === this.userId && entry.track_id === this.trackData.id
      );
      this.hasLiked = !!likedEntry; // Set hasLiked to true if likedEntry is found, otherwise false
    });
  }

  play(trackData: any): void {
    if (this.hasLiked !== undefined) {
      this.audioService.setLike(this.hasLiked);
    } else {
      // Handle the case where this.hasLiked is undefined
      console.error('this.hasLiked is undefined');
    }

    this.audioService.playAudio(trackData);
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

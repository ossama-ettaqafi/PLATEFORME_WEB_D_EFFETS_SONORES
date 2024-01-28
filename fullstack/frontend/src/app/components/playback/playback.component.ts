import { Component, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { LikesService } from 'src/app/services/likes.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css'],
})
export class PlaybackComponent implements OnInit, OnDestroy  {
  public hasLiked: boolean | undefined;
  public userId: number | null | undefined;
  public trackId: number | null | undefined;
  isLiked: boolean | undefined;

  private actionsExecuted = false;

  constructor(
    public audioService: AudioService,
    public usersService: UsersService,
    private likesService: LikesService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userId = this.sharedService.getLoggedInUserId();
    this.audioService.initAudioEventListeners();

    // Subscribe to onTimeUpdate event
    this.audioService.onTimeUpdate.subscribe(() => {
      // Handle time update logic here
    });
  }

  likeTrack(trackData: any): void {
    // console.log("sss");
    if (this.userId !== null && this.userId !== undefined && trackData.id !== undefined) {
      this.likesService.likeTrack(this.userId, trackData.id).subscribe(
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

  dislikeTrack(trackData: any): void {
    if (this.userId !== null && this.userId !== undefined && trackData.id !== undefined) {
      this.likesService.dislikeTrack(this.userId, trackData.id).subscribe(
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
          entry.user_id === this.userId && entry.track_id === this.trackId
      );
      this.hasLiked = !!likedEntry; // Set hasLiked to true if likedEntry is found, otherwise false
    });
  }

  playGlobal(): void {
    this.audioService.playGlobal();
  }

  pauseGlobal(): void {
    this.audioService.pauseAudio();
  }

  getAudioTime(): number {
    // Continue with the regular logic
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
    // Unsubscribe during component destruction
    this.audioService.onTimeUpdate.unsubscribe();
  }
}

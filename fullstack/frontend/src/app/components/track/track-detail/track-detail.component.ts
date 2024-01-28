import { UsersService } from 'src/app/services/users.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LikesService } from 'src/app/services/likes.service';
import { SharedService } from 'src/app/services/shared.service';
import { CategoryService } from 'src/app/services/category.service';
import { AudioService } from 'src/app/services/audio.service';
import { TrackDeleteService } from 'src/app/services/delete-track.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css'],
})
export class TrackDetailComponent implements OnInit, OnDestroy {
  @Input() trackData: any;

  likesCount: any = 0;
  user: any;
  LoggedUserId: any;
  category: any;
  public hasLiked: boolean | undefined;
  isLiked: boolean | undefined;

  constructor(
    private likesService: LikesService,
    private usersService: UsersService,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    public audioService: AudioService,
    public trackDeleteService: TrackDeleteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.LoggedUserId = this.sharedService.getLoggedInUserId();

    this.likesService.getLikes().subscribe((likes) => {
      this.likesCount = likes.filter(
        (like) => like.track_id == this.trackData.id
      ).length;
    });

    this.usersService.getUsers().subscribe((users) => {
      this.user = users.find((user) => user.id == this.trackData.user_id);
    });

    this.getCategoryById(this.trackData.category);

    this.checkIfLiked();
  }

  likeTrack(): void {
    if (
      this.LoggedUserId !== null &&
      this.LoggedUserId !== undefined &&
      this.trackData.id !== undefined
    ) {
      this.likesService
        .likeTrack(this.LoggedUserId, this.trackData.id)
        .subscribe(
          (response) => {
            this.isLiked = true;
            // console.log('Like operation successful:', response);
            // console.log('isLiked:', this.isLiked);
          },
          (error) => {
            console.error('Error during like operation:', error);
          }
        );
    }
  }

  dislikeTrack(): void {
    if (
      this.LoggedUserId !== null &&
      this.LoggedUserId !== undefined &&
      this.trackData.id !== undefined
    ) {
      this.likesService
        .dislikeTrack(this.LoggedUserId, this.trackData.id)
        .subscribe(
          (response) => {
            this.isLiked = false;
            // console.log('Dislike operation successful:', response);
            // console.log('isLiked:', this.isLiked);
          },
          (error) => {
            console.error('Error during dislike operation:', error);
          }
        );
    }
  }

  checkIfLiked(): void {
    this.likesService.getLikes().subscribe((likesData: any[]) => {
      const likedEntry = likesData.find(
        (entry) =>
          entry.user_id === this.LoggedUserId &&
          entry.track_id === this.trackData.id
      );
      this.hasLiked = !!likedEntry; // Set hasLiked to true if likedEntry is found, otherwise false
    });
  }

  public formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);

    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    const formattedSeconds: string = remainingSeconds
      .toString()
      .padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.trackData.image_path = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getCategoryById(categoryId: number): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.category = categories.find((category) => category.id == categoryId);
    });
  }

  play(trackData: any): void {
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

  deleteTrack(): void {
    if (this.trackData.id !== undefined) {
      this.trackDeleteService.deleteTrack(this.trackData.id).subscribe(
        (response) => {
          // console.log('Delete operation successful:', response);

          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error during delete operation:', error);

          // Additional error handling if needed
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.audioService.onTimeUpdate.unsubscribe();
  }
}

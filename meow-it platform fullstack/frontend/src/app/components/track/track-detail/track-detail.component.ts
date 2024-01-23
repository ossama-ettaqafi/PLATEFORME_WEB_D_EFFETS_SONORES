import { UsersService } from 'src/app/services/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { LikesService } from 'src/app/services/likes.service';
import { SharedService } from 'src/app/shared.service';
import { CategoryService } from 'src/app/services/category.service';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css'],
})
export class TrackDetailComponent implements OnInit {
  @Input() trackData: any;

  likesCount: any = 0;
  user: any;
  LoggedUserId: any;
  category: any;

  constructor(
    private likesService: LikesService,
    private usersService: UsersService,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    public audioService: AudioService
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

    this.getCategoryById(this.trackData.categoryId);
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

  ngOnDestroy(): void {
    this.audioService.onTimeUpdate.unsubscribe();
  }
}

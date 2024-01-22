import { UsersService } from 'src/app/services/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LikesService } from 'src/app/services/likes.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css'],
})
export class TrackDetailComponent implements OnInit {
  @Input() trackData: any;

  editTrack: boolean | undefined;
  likesCount: any = 0;
  user: any;
  LoggedUserId: any;
  editedTitle: string = '';
  same_value: boolean | undefined;

  constructor(
    private router: Router,
    private likesService: LikesService,
    private usersService: UsersService,
    private sharedService: SharedService
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

    this.editTrack = false;
    this.same_value = true;
    this.editedTitle = this.trackData.title;
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

  public edit_track() {
    console.log(this.editTrack);
    this.editTrack = true;
  }

  public go_back() {
    this.editTrack = false;
  }

  onInputChange() {
    if (this.editedTitle == this.trackData.title) {
      this.same_value = true;
    } else {
      this.same_value = false;
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.trackData.image_path = e.target.result;
        this.same_value = false;
      };
      reader.readAsDataURL(file);
    }
  }
}

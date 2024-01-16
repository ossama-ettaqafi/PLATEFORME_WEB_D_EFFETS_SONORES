import { filter } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LikesService } from 'src/app/services/likes.service';
import { SharedService } from 'src/app/shared.service';
import { FollowsService } from 'src/app/services/follows.service';
import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {

  @Input() trackData: any;

  showTitle: boolean = true;
  likesCount: any = 0;
  user:any;

  constructor(private router: Router,
    private likesService:LikesService,
    private usersService:UsersService) { }

  ngOnInit() {

    this.likesService.getLikes().subscribe(likes => {
        this.likesCount = likes.filter(like => like.track_id == this.trackData.id).length;
      }
    );

    this.usersService.getUsers().subscribe(users => {
      this.user = users.find(user => user.id == this.trackData.user_id);
    });

    this.showTitle = !this.router.url.includes('/edit');
  }

  public formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);

    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    const formattedSeconds: string = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }



}

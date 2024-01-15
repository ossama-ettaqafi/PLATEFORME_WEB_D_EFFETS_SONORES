import { FollowsService } from './../../services/follows.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LikesService } from 'src/app/services/likes.service';
import { TracksService } from 'src/app/services/tracks.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class ProfileInfosComponent implements OnInit {
  @Input() public userData: any;
  @Input() public LoggedId: any;
  public userId: string | undefined;
  public profileButtons: any[] | undefined;

  loggedInUserId: number | null | undefined;

  tracksCount: number | undefined;
  followersCount: number | undefined;
  followingCount: number | undefined;
  likesCount: number | undefined;
  favoriteTracksCount: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private followsService: FollowsService,
    private tracksService: TracksService,
    private likesService: LikesService
  ) { }

  ngOnInit() {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.getTracksCount();
    this.getFollowersCount();
    this.getFollowingCount();
    this.getLikesCount();
    this.getFavoriteTracksCount();
  }

  getTracksCount() {
    this.tracksService.getTracks().subscribe(data => {
      this.tracksCount = data.filter(track => track.user_id == this.userId).length;
      this.updateProfileButtons();
    });
  }

  getFollowersCount() {
    this.followsService.getFollows().subscribe(data => {
      this.followersCount = data.filter(follow => follow.following_id == this.userId).length;
      this.updateProfileButtons();
    });
  }

  getFollowingCount() {
    this.followsService.getFollows().subscribe(data => {
      this.followingCount = data.filter(follow => follow.follower_id == this.userId).length;
      this.updateProfileButtons();
    });
  }

  getLikesCount() {
    // Fetch likes for the user's tracks
    this.tracksService.getTracks().subscribe(tracksData => {
      const userTrackIds = tracksData.filter(track => track.user_id == this.userId).map(track => track.id);

      // Filter likes based on the user's tracks and count the likes
      this.likesService.getLikes().subscribe(likesData => {
        this.likesCount = likesData.filter(like => userTrackIds.includes(like.track_id)).length;
        this.updateProfileButtons();
      });
    });
  }

  getFavoriteTracksCount() {
    this.likesService.getLikes().subscribe(likesData => {
      const userLikes = likesData.filter(like => like.user_id == this.userId);
      this.favoriteTracksCount = userLikes.length;
      this.updateProfileButtons();
    });
  }

  updateProfileButtons() {
    this.profileButtons = [
      { iconClass: 'fas fa-upload', count: this.tracksCount },
      { iconClass: 'fas fa-thumbs-up', count: this.likesCount },
      { iconClass: 'fas fa-heart', count: this.favoriteTracksCount },
      { iconClass: 'fas fa-person', count: this.followersCount },
      { iconClass: 'fa-solid fa-user-plus', count: this.followingCount }
    ];
  }
}

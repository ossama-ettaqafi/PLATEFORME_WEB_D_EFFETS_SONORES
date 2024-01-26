import { SharedService } from 'src/app/services/shared.service';
import { Component, Input, OnInit } from '@angular/core';
import { FollowsService } from 'src/app/services/follows.service';
import { LikesService } from 'src/app/services/likes.service';
import { TracksService } from 'src/app/services/tracks.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-track-owner',
  templateUrl: './track-owner.component.html',
  styleUrls: ['./track-owner.component.css'],
})
export class TrackOwnerComponent implements OnInit {
  @Input() trackData: any;

  loggedInUserId: number | null | undefined;

  followersCount: number | undefined;
  followingCount: number | undefined;
  userlikesCount: number | undefined;
  user: any;

  constructor(
    private likesService: LikesService,
    private followsService: FollowsService,
    private tracksService: TracksService,
    private sharedService: SharedService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.usersService.getUsers().subscribe((users) => {
      this.user = users.find((user) => user.id == this.trackData.user_id);
    });

    this.getFollowersCount();
    this.getFollowingCount();
    this.getUserLikesCount();
  }

  getFollowersCount() {
    this.followsService.getFollows().subscribe((data) => {
      this.followersCount = data.filter(
        (follow) => follow.following_id == this.trackData.user_id
      ).length;
    });
  }

  getFollowingCount() {
    this.followsService.getFollows().subscribe((data) => {
      this.followingCount = data.filter(
        (follow) => follow.follower_id == this.trackData.user_id
      ).length;
    });
  }

  getUserLikesCount() {
    // Fetch likes for the user's tracks
    this.tracksService.getTracks().subscribe((tracksData) => {
      const userTrackIds = tracksData
        .filter((track) => track.user_id == this.trackData.user_id)
        .map((track) => track.id);

      // Filter likes based on the user's tracks and count the likes
      this.likesService.getLikes().subscribe((likesData) => {
        this.userlikesCount = likesData.filter((like) =>
          userTrackIds.includes(like.track_id)
        ).length;
      });
    });
  }
}

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

  public isFollow: boolean | undefined;

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
      this.checkIfFollows();
    });

    this.getFollowersCount();
    this.getFollowingCount();
    this.getUserLikesCount();
  }

  checkIfFollows(): void {
    if (this.loggedInUserId && this.user && this.user.id) {
      this.followsService.getFollows().subscribe((followsData: any[]) => {
        const followEntry = followsData.find(
          (entry) =>
            entry.follower_id === this.loggedInUserId &&
            entry.following_id === this.user.id
        );
        this.isFollow = !!followEntry; // Set isFollow to true if followEntry is found, otherwise false
      });
    } else {
      this.isFollow = false; // Set isFollow to false if user data or logged-in user ID is not available
    }
  }

  followUser(): void {
    if (this.loggedInUserId && this.user && this.user.id) {
      this.followsService
        .followUser(this.loggedInUserId, this.user.id)
        .subscribe(() => {
          // Optional: You can perform additional actions after successful follow
          this.checkIfFollows(); // Refresh follow status after follow
        });
    }
  }

  unfollowUser(): void {
    if (this.loggedInUserId && this.user && this.user.id) {
      this.followsService
        .unfollowUser(this.loggedInUserId, this.user.id)
        .subscribe(() => {
          // Optional: You can perform additional actions after successful unfollow
          this.checkIfFollows(); // Refresh follow status after unfollow
        });
    }
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

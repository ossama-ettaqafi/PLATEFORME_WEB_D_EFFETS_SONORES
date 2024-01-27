import { FollowsService } from './../../services/follows.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LikesService } from 'src/app/services/likes.service';
import { TracksService } from 'src/app/services/tracks.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css'],
})
export class ProfileInfosComponent implements OnInit {
  // @Input() public userData: any;
  @Input() public LoggedId: any;
  userData: any;
  public userId: number | undefined;
  public profileButtons: any[] | undefined;

  loggedInUserId: number | null | undefined;

  tracksCount: number | undefined;
  followersCount: number | undefined;
  followingCount: number | undefined;
  likesCount: number | undefined;
  favoriteTracksCount: number | undefined;

  public isFollow: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private followsService: FollowsService,
    private tracksService: TracksService,
    private likesService: LikesService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
    });

    this.getTracksCount();
    this.getFollowersCount();
    this.getFollowingCount();
    this.getLikesCount();
    this.getFavoriteTracksCount();

    this.userService.getUsers().subscribe((users) => {
      this.userData = users.find((user) => user.id === this.userId);
      this.checkIfFollows();
    });
  }

  checkIfFollows(): void {
    if (this.loggedInUserId && this.userData && this.userData.id) {
      this.followsService.getFollows().subscribe((followsData: any[]) => {
        const followEntry = followsData.find(
          (entry) =>
            entry.follower_id === this.loggedInUserId &&
            entry.following_id === this.userData.id
        );
        this.isFollow = !!followEntry; // Set isFollow to true if followEntry is found, otherwise false
      });
    } else {
      this.isFollow = false; // Set isFollow to false if user data or logged-in user ID is not available
    }
  }

  followUser(): void {
    if (this.loggedInUserId && this.userData && this.userData.id) {
      this.followsService
        .followUser(this.loggedInUserId, this.userData.id)
        .subscribe(() => {
          // Optional: You can perform additional actions after successful follow
          this.checkIfFollows(); // Refresh follow status after follow
        });
    }
  }

  unfollowUser(): void {
    if (this.loggedInUserId && this.userData && this.userData.id) {
      this.followsService
        .unfollowUser(this.loggedInUserId, this.userData.id)
        .subscribe(() => {
          // Optional: You can perform additional actions after successful unfollow
          this.checkIfFollows(); // Refresh follow status after unfollow
        });
    }
  }

  getTracksCount() {
    this.tracksService.getTracks().subscribe((data) => {
      this.tracksCount = data.filter(
        (track) => track.user_id == this.userId
      ).length;
      this.updateProfileButtons();
    });
  }

  getFollowersCount() {
    this.followsService.getFollows().subscribe((data) => {
      this.followersCount = data.filter(
        (follow) => follow.following_id == this.userId
      ).length;
      this.updateProfileButtons();
    });
  }

  getFollowingCount() {
    this.followsService.getFollows().subscribe((data) => {
      this.followingCount = data.filter(
        (follow) => follow.follower_id == this.userId
      ).length;
      this.updateProfileButtons();
    });
  }

  getLikesCount() {
    // Fetch likes for the user's tracks
    this.tracksService.getTracks().subscribe((tracksData) => {
      const userTrackIds = tracksData
        .filter((track) => track.user_id == this.userId)
        .map((track) => track.id);

      // Filter likes based on the user's tracks and count the likes
      this.likesService.getLikes().subscribe((likesData) => {
        this.likesCount = likesData.filter((like) =>
          userTrackIds.includes(like.track_id)
        ).length;
        this.updateProfileButtons();
      });
    });
  }

  getFavoriteTracksCount() {
    this.likesService.getLikes().subscribe((likesData) => {
      const userLikes = likesData.filter((like) => like.user_id == this.userId);
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
      { iconClass: 'fa-solid fa-user-plus', count: this.followingCount },
    ];
  }
}

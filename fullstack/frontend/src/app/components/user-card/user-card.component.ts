import { Component, Input, OnInit } from '@angular/core';
import { FollowsService } from 'src/app/services/follows.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() public userData: any;

  public loggedInUserId: number | null | undefined;
  public isFollow: boolean | undefined;

  constructor(
    private sharedService: SharedService,
    private followsService: FollowsService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();
    this.checkIfFollows();
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
}

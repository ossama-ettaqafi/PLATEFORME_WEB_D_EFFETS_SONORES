import { TracksService } from 'src/app/services/tracks.service';
import { FollowsService } from 'src/app/services/follows.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  users: any[] | undefined;
  userFound: any | undefined;
  loggedInUserId: number | null | undefined;
  tracks: any[] | undefined;
  followers: any[] | undefined;
  following: any[] | undefined;

  constructor(
    private usersService: UsersService,
    private tracksService: TracksService,
    private followsService: FollowsService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private titleService: Title
  ) {

    this.setTitle("meow-it | Profil de l'utilisateur");

  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.route.params.subscribe((params) => {
      const userId = +params['id'];

      this.usersService.getUsers().subscribe((users) => {
        this.userFound = users.find((user) => user.id == userId);

        this.tracksService.getTracks().subscribe((tracks) => {
          this.tracks = tracks.filter((track) => track.user_id == userId);
        });

        this.followsService.getFollows().subscribe((follows) => {
          // Filter and map followers
          this.followers = follows
            .filter((follow) => follow.following_id == userId)
            .map((follow) =>
              users.find((user) => user.id == follow.follower_id)
            );

          // Filter and map following
          this.following = follows
            .filter((follow) => follow.follower_id == userId)
            .map((follow) =>
              users.find((user) => user.id == follow.following_id)
            );
        });
      });
    });
  }
}

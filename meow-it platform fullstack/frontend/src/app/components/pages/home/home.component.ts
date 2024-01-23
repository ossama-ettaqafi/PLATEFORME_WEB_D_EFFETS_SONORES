import { Component, OnInit } from '@angular/core';
import { TracksService } from 'src/app/services/tracks.service';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any;
  tracks: any;
  loggedInUserId: number | null | undefined;
  loggedUser: any[] | undefined;
  loggedInUserName: string | undefined;

  constructor(
    private usersService: UsersService,
    private tracksService: TracksService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.tracksService.getTracks().subscribe((tracks) => {
      this.tracks = tracks;
    });
  }

  getUserById(userId: number): any {
    // Check if this.users is defined before using the find method
    if (this.users) {
      return this.users.find((user: any) => user.id == userId);
    } else {
      // Handle the case where this.users is undefined (return null or handle it accordingly)
      return null;
    }
  }


  categories = [
    { id: 1, name: 'Nature', icon: 'fas fa-leaf', side: 'left' },
    { id: 2, name: 'Human', icon: 'fas fa-user', side: 'left' },
    { id: 3, name: 'Animals', icon: 'fas fa-paw', side: 'left' },
    { id: 4, name: 'Ambiances', icon: 'fas fa-tree', side: 'right' },
    { id: 5, name: 'Instruments', icon: 'fas fa-music', side: 'right' },
    { id: 6, name: 'Things', icon: 'fas fa-cog', side: 'right' },
  ];
}

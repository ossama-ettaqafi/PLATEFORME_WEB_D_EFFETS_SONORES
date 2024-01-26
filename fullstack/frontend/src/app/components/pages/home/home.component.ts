import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { TracksService } from 'src/app/services/tracks.service';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';
import { Title } from '@angular/platform-browser';

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
  categories: any;

  constructor(
    private usersService: UsersService,
    private tracksService: TracksService,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private titleService: Title
  ) {
    this.setTitle('meow-it | Plate-forme de partage des effets sonores gratuits');
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.tracksService.getTracks().subscribe((tracks) => {
      this.tracks = tracks;
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getUserById(userId: number): any {
    if (this.users) {
      return this.users.find((user: any) => user.id == userId);
    } else {
      return null;
    }
  }
}

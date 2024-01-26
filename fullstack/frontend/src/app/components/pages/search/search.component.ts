import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TracksService } from 'src/app/services/tracks.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchFilter = 'all';
  filteredUsers: any;
  filteredTracks: any;
  allUsers: any;

  constructor(
    private usersService: UsersService,
    private tracksService: TracksService,
    private titleService: Title
  ) {
    this.setTitle('meow-it | Page de recherche');
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.performSearch();
    this.usersService.getUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  performSearch(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.searchFilter === 'all') {
        this.tracksService.getTracks().subscribe((tracks) => {
          this.filteredTracks = tracks.filter((track) =>
            track.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      } else {
        this.filteredTracks = [];
      }
    });
  }

  getUserById(userId: number): any {
    return this.allUsers.find((user: any) => user.id === userId);
  }
}

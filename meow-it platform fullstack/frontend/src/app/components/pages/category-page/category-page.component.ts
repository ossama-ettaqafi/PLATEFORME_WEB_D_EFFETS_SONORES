import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TracksService } from 'src/app/services/tracks.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  categoryId: string | undefined;
  filteredTracks: any[] = [];
  category: any;
  allUsers: any;

  constructor(private route: ActivatedRoute, private router: Router,
    private catergoryService:CategoryService,
    private tracksService:TracksService,
    private usersService:UsersService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });

    this.tracksService.getTracks().subscribe(tracks => {

      if (this.categoryId) {
        this.filteredTracks = tracks.filter(track => track.categoryId == this.categoryId);
      }

    });

    this.catergoryService.getCategories().subscribe(categories => {
      this.category = categories.find(category => category.id == this.categoryId)
    });

    this.usersService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  getUserById(userId: number): any {
    return this.allUsers.find((user: any) => user.id === userId);
  }

  navigateBack(): void {
    const pathToNavigateBack = '/home';

    this.router.navigate([pathToNavigateBack]);
  }

}

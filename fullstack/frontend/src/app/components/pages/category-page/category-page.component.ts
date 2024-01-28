import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { TracksService } from 'src/app/services/tracks.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent implements OnInit {
  categoryId: string | undefined;
  filteredTracks: any[] = [];
  category: any;
  allUsers: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private tracksService: TracksService,
    private usersService: UsersService,
    private titleService: Title) {
      this.setTitle('meow-it | Page de catégorie');
    }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });

    this.tracksService.getTracks().subscribe((tracks) => {
      if (this.categoryId) {
        this.filteredTracks = tracks.filter(
          (track) => track.category == this.categoryId
        );
      }
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.category = categories.find(
        (category) => category.id == this.categoryId
      );
    });

    this.usersService.getUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  getUserById(userId: number): any {
    if (this.allUsers) {
      const user = this.allUsers.find((user: any) => user.id === userId);
      return user || null; // Return null if the user is not found
    }
    return null; // Return null if allUsers is not yet populated
  }


  navigateBack(): void {
    const pathToNavigateBack = '/home';

    this.router.navigate([pathToNavigateBack]);
  }
}

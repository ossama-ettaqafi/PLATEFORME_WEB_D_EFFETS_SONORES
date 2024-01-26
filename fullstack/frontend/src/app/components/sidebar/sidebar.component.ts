import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  loggedInUserId: number | null | undefined;
  loggedUser: any[] | undefined;

  constructor(
    private usersService: UsersService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.usersService.getUsers().subscribe((data) => {
      this.loggedUser = data.filter((user) => user.id == this.loggedInUserId);
    });
  }

  logout(): void{
    this.sharedService.setLoggedInUserId(null);
    this.router.navigate(['/login']);
  }
}

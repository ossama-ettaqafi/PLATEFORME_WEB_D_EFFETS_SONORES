import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { map, switchMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  users: any[] | undefined;
  userId: string | undefined;
  userFound: any | undefined;
  loggedInUserId: number | null | undefined;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private sharedService:SharedService) {}

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.usersService.getUsers().pipe(
        map(users => users.find(user => user.id.toString() === id))
      ))
    ).subscribe(user => {
      this.userFound = user;
    });
  }

}

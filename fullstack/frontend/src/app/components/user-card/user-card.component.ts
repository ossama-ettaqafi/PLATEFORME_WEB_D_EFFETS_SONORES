import { Component, Input, OnInit } from '@angular/core';
import { FollowsService } from 'src/app/services/follows.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() public userData: any;

  public loggedInUserId: number | null | undefined;

  constructor(
    private sharedService: SharedService,
    private followsService: FollowsService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();
  }

}

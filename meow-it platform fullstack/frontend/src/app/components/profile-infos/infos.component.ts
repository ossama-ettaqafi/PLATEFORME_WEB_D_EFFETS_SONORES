import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class ProfileInfosComponent implements OnInit {
  @Input() public userData:any;
  @Input() public LoggedId:any;
  public userId: string | undefined;

  loggedInUserId: number | null | undefined;

  user = {
    profileButtons: [
      { iconClass: 'fas fa-upload', count: 22 },
      { iconClass: 'fas fa-thumbs-up', count: 11 },
      { iconClass: 'fas fa-heart', count: 33 },
      { iconClass: 'fas fa-person', count: 33 },
      { iconClass: 'fa-solid fa-user-plus', count: 33 }
    ]
  };

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit() {
    console.log(typeof this.LoggedId);

    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
}

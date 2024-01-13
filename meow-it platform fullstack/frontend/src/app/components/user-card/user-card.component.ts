import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  public User:any = {
    id: 12,
    image: "assets/images/def/test-image.jpg",
    name: "OSSAMA"
  };
}

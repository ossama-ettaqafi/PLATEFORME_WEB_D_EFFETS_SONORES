import { Component } from '@angular/core';

@Component({
  selector: 'app-feed-me',
  templateUrl: './feed-me.component.html',
  styleUrls: ['./feed-me.component.css']
})
export class FeedMeComponent {
  public imageURL:string = "assets/images/def/feed-pub.png";
  public userName:string = "OSSAMA"
  public welcomeMessage:string = `Welcome ${this.userName},`;
}

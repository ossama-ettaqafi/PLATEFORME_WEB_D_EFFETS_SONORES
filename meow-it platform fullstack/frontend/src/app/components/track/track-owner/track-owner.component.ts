import { Component } from '@angular/core';

@Component({
  selector: 'app-track-owner',
  templateUrl: './track-owner.component.html',
  styleUrls: ['./track-owner.component.css']
})
export class TrackOwnerComponent {
  owner = {
    ownerId : 1,
    imageURL: 'assets/images/def/test-image.jpg',
    followers: 11 + ' Followers',
    following: 13 + ' Following',
    likes: 14 + ' Likes'
  }
}

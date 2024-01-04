import { Component } from '@angular/core';

@Component({
  selector: 'app-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.css']
})
export class TrackEditComponent {
  track = {
    imageURL: 'assets/images/def/test-image.jpg',
    trackName: 'My Track',
    artistName: 'XXXOSSAMA',
    trackDuration: '03:00',
    uploadDate: 'January 1, 2023',
    likeCount: 100
  }
}

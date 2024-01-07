import { Component } from '@angular/core';

@Component({
  selector: 'app-track-upload',
  templateUrl: './track-upload.component.html',
  styleUrls: ['./track-upload.component.css']
})
export class TrackUploadComponent {
  track = {
    imageURL: 'assets/images/def/test-image.jpg',
    trackName: 'My Track',
    artistName: 'XXXOSSAMA',
    trackDuration: '03:00',
    uploadDate: 'January 1, 2023',
    likeCount: 100
  }

}

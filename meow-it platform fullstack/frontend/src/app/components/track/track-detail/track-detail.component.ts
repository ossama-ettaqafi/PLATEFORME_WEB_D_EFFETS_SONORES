import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent {
  track = {
    imageURL: 'assets/images/def/test-image.jpg',
    trackName: 'My Track',
    artistName: 'XXXOSSAMA',
    trackDuration: '03:00',
    uploadDate: 'January 1, 2023',
    likeCount: 100
  }

  constructor(private router: Router) { }

  showTitle: boolean = false;

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showTitle = this.router.url.includes('/edit')? false : true;
    });
  }

}

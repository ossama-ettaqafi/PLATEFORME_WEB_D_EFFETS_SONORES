import { Component } from '@angular/core';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css']
})
export class TrackCardComponent {

  public myTrack:any = {
    id: 1,
    idU: 100,
    title: "My Song",
    image: "song.jpg",
  };
}

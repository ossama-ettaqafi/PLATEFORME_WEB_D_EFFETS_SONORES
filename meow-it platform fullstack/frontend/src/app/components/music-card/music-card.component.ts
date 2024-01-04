import { Component } from '@angular/core';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css']
})
export class MusicCardComponent {
  public imageURL: string = "assets/images/def/test-image.jpg";
  public trackName: string = "Track Name";
  public artistName: string = "Artist Name";

}

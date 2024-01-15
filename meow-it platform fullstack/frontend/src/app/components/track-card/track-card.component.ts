import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css']
})
export class TrackCardComponent{
  @Input() public trackData:any;
  @Input() public user:any;
}

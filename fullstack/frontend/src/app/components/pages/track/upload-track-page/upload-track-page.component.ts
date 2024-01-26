import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-track-page',
  templateUrl: './upload-track-page.component.html',
  styleUrls: ['./upload-track-page.component.css'],
})
export class UploadTrackPageComponent {
  constructor(private titleService: Title) {
    this.setTitle('meow-it | Page de téléchargement de son');
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.css']
})
export class PlaybackComponent {
  public currentTrack: string = "Current Track Name";
  public artistName: string = "Artist Name";

  public imageURL: string = "assets/images/def/test-image.jpg";

  public maxTime: number = 200000; // Assuming maxTime is in milliseconds

  // Convert milliseconds to seconds
  public maxTimeInSeconds: number = Math.floor(this.maxTime / 1000);

  // Format the seconds as "mm:ss"
  public maxTimeString: string = this.formatTime(this.maxTimeInSeconds);

  private formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);

    // Pad with leading zeros
    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    const formattedSeconds: string = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

}

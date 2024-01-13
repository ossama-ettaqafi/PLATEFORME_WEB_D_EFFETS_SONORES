import { Component /*, OnInit*/ } from '@angular/core';
// import { TracksService } from 'src/app/services/tracks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // tracks: any[] | undefined;

  // constructor(private tracksService: TracksService) {}

  // ngOnInit(): void {

  //   console.log("test");

  //   this.tracksService.getTracks().subscribe(data => {
  //     this.tracks = data;

  //     console.log(this.tracks);
  //   });
  // }

  public category1:any = {
    Id : 1
  }


  public imageURL:string = "assets/images/def/feed-pub.png";
  public userName:string = "OSSAMA"
  public welcomeMessage:string = `Welcome ${this.userName},`;
}

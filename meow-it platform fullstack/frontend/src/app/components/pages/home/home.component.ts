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

  public userName:string = "OSSAMA"
  public imageURL:string = "assets/images/def/feed-pub.png";
  public welcomeMessage:string = `Welcome ${this.userName},`;

  categories = [
    { id: 1, name: 'Nature', icon: 'fas fa-leaf', side: 'left' },
    { id: 2, name: 'Human', icon: 'fas fa-user', side: 'left' },
    { id: 3, name: 'Animals', icon: 'fas fa-paw', side: 'left' },
    { id: 4, name: 'Ambiances', icon: 'fas fa-tree', side: 'right' },
    { id: 5, name: 'Instruments', icon: 'fas fa-music', side: 'right' },
    { id: 6, name: 'Things', icon: 'fas fa-cog', side: 'right' }
  ];

}

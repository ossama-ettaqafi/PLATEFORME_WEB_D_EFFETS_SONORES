import { Component } from '@angular/core';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class ProfileInfosComponent {
  user = {
    image: 'assets/images/def/test-image.jpg',
    name: 'OSSAMA',
    location: 'City, Country',
    joiningDate: 'January 1, 2024',
    profileButtons: [
      { iconClass: 'fas fa-upload', count: 22 },
      { iconClass: 'fas fa-thumbs-up', count: 11 },
      { iconClass: 'fas fa-heart', count: 33 },
      { iconClass: 'fas fa-person', count: 33 },
      { iconClass: 'fa-solid fa-user-plus', count: 33 }
    ],
    bio: 'this is my bio.'
  };
}

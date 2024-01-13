import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent {
  comments = [
    { iconClass: 'fas fa-thumbs-up', userName: 'OSSAMA', notificationType: 'liked' },
    { iconClass: 'fas fa-user-plus', userName: 'Ahmed', notificationType: 'started following' }
  ];

  notifContent(comment: any): string {
    return `${comment.userName} ${comment.notificationType} your uploaded sound`;
  }
}

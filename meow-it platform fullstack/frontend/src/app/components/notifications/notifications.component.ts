import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  comments = [
    { iconClass: 'fas fa-thumbs-up', userName: 'OSSAMA', notificationType: 'liked' },
    { iconClass: 'fas fa-user-plus', userName: 'Ahmed', notificationType: 'started following' }
  ];

  notifContent(comment: any): string {
    return `${comment.userName} ${comment.notificationType} your uploaded sound`;
  }
}

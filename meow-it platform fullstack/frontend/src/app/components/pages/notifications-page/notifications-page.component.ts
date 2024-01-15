import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent implements OnInit {
  loggedInUserId: number | null | undefined;
  notifications: any[] | undefined;
  allUsers: any[] | undefined;
  filteredNotifications: any[] = [];

  comments = [
    { iconClass: 'fas fa-thumbs-up', notificationMessage: 'liked your sound effect' },
    { iconClass: 'fas fa-user-plus', notificationMessage: 'started following you' }
  ];

  constructor(
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.notificationsService.getNotifications().subscribe(allNotifications => {
      this.notifications = allNotifications.filter(notification => notification.user_id == this.loggedInUserId);

      this.usersService.getUsers().subscribe(users => {
        this.allUsers = users;
        this.loadSenderInfo();
      });
    });
  }

  loadSenderInfo() {
    if (this.allUsers && this.notifications) {
      this.filteredNotifications = this.notifications.map(notification => {
        const sender = this.allUsers?.find(user => user && user.id == notification.sender_id);
        return {
          senderName: sender ? sender.name : 'Unknown Sender',
          notificationType: notification.notification_type
        };
      });
    }
  }
}

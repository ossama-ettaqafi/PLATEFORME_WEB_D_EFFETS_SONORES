import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css'],
})
export class NotificationsPageComponent implements OnInit {
  loggedInUserId: number | null | undefined;
  notifications: any[] | undefined;
  allUsers: any[] | undefined;
  filteredNotifications: any[] = [];

  comments = [
    {
      iconClass: 'fas fa-thumbs-up',
      notificationMessage: 'a aimé votre effet sonore',
    },
    {
      iconClass: 'fas fa-user-plus',
      notificationMessage: 'commencé à te suivre',
    },
  ];

  constructor(
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private sharedService: SharedService,
    private titleService: Title
  ) {
    this.setTitle('meow-it | Page de notifications');
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.loggedInUserId = this.sharedService.getLoggedInUserId();

    this.notificationsService
      .getNotifications()
      .subscribe((allNotifications) => {
        this.notifications = allNotifications.filter(
          (notification) => notification.user_id == this.loggedInUserId
        );

        this.usersService.getUsers().subscribe((users) => {
          this.allUsers = users;
          this.loadSenderInfo();
        });
      });
  }

  loadSenderInfo() {
    if (this.allUsers && this.notifications) {
      this.filteredNotifications = this.notifications.map((notification) => {
        const sender = this.allUsers?.find(
          (user) => user && user.id == notification.sender_id
        );
        return {
          senderName: sender ? sender.name : 'Unknown Sender',
          notificationType: notification.notification_type,
        };
      });
    }
  }
}

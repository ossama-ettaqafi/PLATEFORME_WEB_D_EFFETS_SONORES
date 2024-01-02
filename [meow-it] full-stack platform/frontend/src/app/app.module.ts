import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SoundEffectComponent } from './sound-effect/sound-effect.component';
import { PlaybackbarComponent } from './playbackbar/playbackbar.component';
import { UsersComponent } from './users/users.component';
import { FollowUserComponent } from './follow-user/follow-user.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { TrackDetailEditComponent } from './track-detail-edit/track-detail-edit.component';
import { FeedComponent } from './feed/feed.component';
import { UserCardComponent } from './user-card/user-card.component';
import { TrackCardComponent } from './track-card/track-card.component';
import { CardsCollectionComponent } from './cards-collection/cards-collection.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SoundEffectComponent,
    PlaybackbarComponent,
    UsersComponent,
    FollowUserComponent,
    NotificationsComponent,
    ProfileDetailComponent,
    TrackDetailComponent,
    TrackDetailEditComponent,
    FeedComponent,
    UserCardComponent,
    TrackCardComponent,
    CardsCollectionComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

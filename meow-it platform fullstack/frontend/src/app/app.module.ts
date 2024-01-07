import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlaybackComponent } from './components/playback/playback.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MusicCardComponent } from './components/music-card/music-card.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FeedMeComponent } from './components/feed-me/feed-me.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileInfosComponent } from './components/profile-infos/infos.component';
import { TrackDetailComponent } from './components/track/track-detail/track-detail.component';
import { TrackOwnerComponent } from './components/track/track-owner/track-owner.component';
import { TrackEditComponent } from './components/track/track-edit/track-edit.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/pages/search/search.component';
import { NotificationsPageComponent } from './components/pages/notifications-page/notifications-page.component';
import { SettingsPageComponent } from './components/pages/settings-page/settings-page.component';
import { LoginPageComponent } from './components/pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/auth/register-page/register-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { TrackPageComponent } from './components/pages/track/track-page/track-page.component';
import { EditTrackPageComponent } from './components/pages/track/edit-track-page/edit-track-page.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { UsersService } from './services/users.service';
import { TracksService } from './services/tracks.service';
import { NotificationsService } from './services/notifications.service';
import { LikesService } from './services/likes.service';
import { FollowsService } from './services/follows.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PlaybackComponent,
    UserCardComponent,
    MusicCardComponent,
    SearchbarComponent,
    FeedMeComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotificationsComponent,
    ProfileInfosComponent,
    TrackDetailComponent,
    TrackOwnerComponent,
    TrackEditComponent,
    HomeComponent,
    SearchComponent,
    NotificationsPageComponent,
    SettingsPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    TrackPageComponent,
    EditTrackPageComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UsersService,
    TracksService,
    NotificationsService,
    LikesService,
    FollowsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlaybackComponent } from './components/playback/playback.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ProfileInfosComponent } from './components/profile-infos/infos.component';
import { TrackDetailComponent } from './components/track/track-detail/track-detail.component';
import { TrackOwnerComponent } from './components/track/track-owner/track-owner.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/pages/search/search.component';
import { NotificationsPageComponent } from './components/pages/notifications-page/notifications-page.component';
import { SettingsPageComponent } from './components/pages/settings-page/settings-page.component';
import { LoginPageComponent } from './components/pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/auth/register-page/register-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { TrackPageComponent } from './components/pages/track/track-page/track-page.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { UsersService } from './services/users.service';
import { TracksService } from './services/tracks.service';
import { NotificationsService } from './services/notifications.service';
import { LikesService } from './services/likes.service';
import { FollowsService } from './services/follows.service';
import { TrackCardComponent } from './components/track-card/track-card.component';
import { UploadTrackPageComponent } from './components/pages/track/upload-track-page/upload-track-page.component';
import { TrackUploadComponent } from './components/track/track-upload/track-upload.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { CategoryPageComponent } from './components/pages/category-page/category-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatTimePipe } from './pipes/format-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PlaybackComponent,
    UserCardComponent,
    ProfileInfosComponent,
    TrackDetailComponent,
    TrackOwnerComponent,
    HomeComponent,
    SearchComponent,
    NotificationsPageComponent,
    SettingsPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    TrackPageComponent,
    NotfoundComponent,
    TrackCardComponent,
    UploadTrackPageComponent,
    TrackUploadComponent,
    UploadButtonComponent,
    CategoryPageComponent,
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
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

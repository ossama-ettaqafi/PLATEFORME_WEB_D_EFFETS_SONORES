import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NotificationsPageComponent } from './components/pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { SearchComponent } from './components/pages/search/search.component';
import { TrackPageComponent } from './components/pages/track/track-page/track-page.component';
import { SettingsPageComponent } from './components/pages/settings-page/settings-page.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { LoginPageComponent } from './components/pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/auth/register-page/register-page.component';
import { UploadTrackPageComponent } from './components/pages/track/upload-track-page/upload-track-page.component';
import { TrackEditComponent } from './components/track/track-edit/track-edit.component';
import { CategoryPageComponent } from './components/pages/category-page/category-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'notifications', component: NotificationsPageComponent},
  { path: 'search', component: SearchComponent},
  { path: 'profile/:id', component: ProfilePageComponent},
  { path: 'settings/:id', component: SettingsPageComponent},
  { path: 'track/:id', component: TrackPageComponent,
    children: [
      { path: 'edit', component: TrackEditComponent}
    ]
  },
  { path: 'upload-track', component: UploadTrackPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'not-found', component: NotfoundComponent},
  { path: 'category/:id', component: CategoryPageComponent},
  { path: '**', redirectTo:'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

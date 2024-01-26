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
import { AuthGuard } from './guards/auth.guard';
import { CategoryGuard } from './guards/category.guard';
import { CategoryPageComponent } from './components/pages/category-page/category-page.component';
import { ProfileGuard } from './guards/profile.guard';
import { TrackGuard } from './guards/track.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'notifications',
    component: NotificationsPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'upload-track',
    component: UploadTrackPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'not-found', component: NotfoundComponent, canActivate: [AuthGuard] },
  {
    path: 'track/:id',
    component: TrackPageComponent,
    canActivate: [AuthGuard, TrackGuard],
  },
  {
    path: 'profile/:id',
    component: ProfilePageComponent,
    canActivate: [AuthGuard, ProfileGuard],
  },
  {
    path: 'category/:id',
    component: CategoryPageComponent,
    canActivate: [AuthGuard, CategoryGuard],
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

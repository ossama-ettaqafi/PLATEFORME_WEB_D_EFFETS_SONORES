import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NotificationsPageComponent } from './components/pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { SearchComponent } from './components/pages/search/search.component';
import { TrackPageComponent } from './components/pages/track/track-page/track-page.component';
import { SettingsPageComponent } from './components/pages/settings-page/settings-page.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'notifications', component: NotificationsPageComponent},
  { path: 'profile/:id', component: ProfilePageComponent},
  { path: 'search', component: SearchComponent},
  { path: 'track/:id', component: TrackPageComponent},
  { path: 'settings', component: SettingsPageComponent},
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo:'404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

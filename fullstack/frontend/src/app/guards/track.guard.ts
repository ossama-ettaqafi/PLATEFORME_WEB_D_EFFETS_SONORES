import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { TracksService } from '../services/tracks.service';

@Injectable({
  providedIn: 'root',
})
export class TrackGuard implements CanActivate {
  constructor(private tracksService: TracksService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const requestedTrackId = route.params['id']; // Assuming you have a route parameter named 'id'

    // Fetch track data based on the ID
    return this.tracksService.getTrackById(requestedTrackId).pipe(
      switchMap(track => {
        if (!track) {
          // Track not found, redirect to 'not-found' page
          return of(this.router.parseUrl('/not-found'));
        }

        // Continue with the route activation
        return of(true);
      }),
      catchError(() => of(this.router.parseUrl('/not-found')))
    );
  }
}

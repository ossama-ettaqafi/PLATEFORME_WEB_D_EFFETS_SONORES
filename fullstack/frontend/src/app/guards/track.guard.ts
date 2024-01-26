import { TracksService } from 'src/app/services/tracks.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackGuard implements CanActivate {
  constructor(private tracksService: TracksService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requestedTrackId = route.params['id']; // Assuming you have a route parameter named 'TrackId'

    // Get the valid Track IDs from the service
    const validTrackIds = this.tracksService.getTracksIds();

    // console.log(validTrackIds);

    // Check if the requested Track ID is valid
    const isValidTrackId = validTrackIds.includes(requestedTrackId);

    if (!isValidTrackId) {
      // Redirect to the 'not-found' page
      return this.router.parseUrl('/not-found');
    }

    // Continue with the route activation
    return true;
  }
}

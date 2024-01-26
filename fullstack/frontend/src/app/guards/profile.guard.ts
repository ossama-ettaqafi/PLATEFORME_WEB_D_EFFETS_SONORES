import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const requestedUserId = route.params['id']; // Assuming you have a route parameter named 'UserId'

    // Fetch user data based on the ID
    return this.userService.getUserById(requestedUserId).pipe(
      switchMap(user => {
        if (!user) {
          // User not found, redirect to 'not-found' page
          return of(this.router.parseUrl('/not-found'));
        }

        // Continue with the route activation
        return of(true);
      }),
      catchError(() => of(this.router.parseUrl('/not-found')))
    );
  }
}

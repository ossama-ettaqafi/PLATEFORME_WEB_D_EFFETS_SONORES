import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requestedUserId = route.params['id']; // Assuming you have a route parameter named 'UserId'

    // Get the valid User IDs from the service
    const validUserIds = this.userService.getUsersIds();

    // Check if the requested User ID is valid
    const isValidUserId = validUserIds.includes(requestedUserId);

    if (!isValidUserId) {
      // Redirect to the 'not-found' page
      return this.router.parseUrl('/not-found');
    }

    // Continue with the route activation
    return true;
  }
}

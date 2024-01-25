import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryGuard implements CanActivate {
  constructor(private categoryService: CategoryService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requestedCategoryId = route.params['id']; // Assuming you have a route parameter named 'categoryId'

    // Get the valid category IDs from the service
    const validCategoryIds = this.categoryService.getCategoryIds();

    // Check if the requested category ID is valid
    const isValidCategoryId = validCategoryIds.includes(requestedCategoryId);


    console.log(requestedCategoryId);

    if (!isValidCategoryId) {
      // Redirect to the 'not-found' page
      return this.router.parseUrl('/not-found');
    }

    // Continue with the route activation
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryGuard implements CanActivate {
  constructor(private categoryService: CategoryService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requestedCategoryId = route.params['id']; // Assuming you have a route parameter named 'categoryId'

    // Fetch category data based on the ID
    return this.categoryService.getCategoryById(requestedCategoryId).pipe(
      switchMap(category => {
        if (!category) {
          // Category not found, redirect to 'not-found' page
          return of(this.router.parseUrl('/not-found'));
        }

        // Continue with the route activation
        return of(true);
      }),
      catchError(() => of(this.router.parseUrl('/not-found')))
    );
  }
}

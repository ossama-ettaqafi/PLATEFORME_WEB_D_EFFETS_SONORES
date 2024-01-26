import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'assets/api/data/categories.json';
  private categoryIds: string[] = [];

  constructor(private http: HttpClient) {
    this.fetchCategoryIds();
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategoryIds(): string[] {
    return this.categoryIds;
  }

  getCategoryById(categoryId: string): Observable<any> {
    return this.getCategories().pipe(
      map(categories => categories.find(category => category.id.toString() === categoryId))
    );
  }

  private fetchCategoryIds() {
    this.getCategories().subscribe(categories => {
      this.categoryIds = categories.map(category => category.id.toString());
    });
  }
}

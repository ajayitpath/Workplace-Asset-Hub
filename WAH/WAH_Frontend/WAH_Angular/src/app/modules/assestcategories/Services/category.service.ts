import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetCategory } from '../../../shared/Model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'https://localhost:7126/api/AssetCategories';
  CategoryName: any;
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<AssetCategory[]> {
    return this.http.get<AssetCategory[]>(this.baseUrl);
  }

  // GET: Category by ID
  getCategoryById(id: string): Observable<AssetCategory> {
    return this.http.get<AssetCategory>(`${this.baseUrl}/${id}`);
  }

  // POST: Create Category
  createCategory(category: AssetCategory): Observable<AssetCategory> {
    return this.http.post<AssetCategory>(this.baseUrl, category);
  }

  // PUT: Update Category
  updateCategory(id: string, payload: AssetCategory): Observable<any> {
    debugger;
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  // DELETE: Delete Category
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

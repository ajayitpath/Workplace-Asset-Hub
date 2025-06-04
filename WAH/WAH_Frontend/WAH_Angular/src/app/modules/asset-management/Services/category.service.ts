import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'https://localhost:7126/api/AssetCategories';
  constructor(private http:HttpClient) { }

  getAllCategories(): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}

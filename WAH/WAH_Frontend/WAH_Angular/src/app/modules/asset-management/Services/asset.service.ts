import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAssetResponse, Asset } from '../../../shared/Model/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private baseUrl = 'https://localhost:7126/api/Asset';
   constructor(private http: HttpClient) { }

  createAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.baseUrl, asset);
  }

  getAssetById(id: string): Observable<ApiAssetResponse> {
    return this.http.get<ApiAssetResponse>(`${this.baseUrl}/${id}`);
  }

  updateAsset(id: string, asset: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.baseUrl}/${id}`, asset);
  }

  deleteAsset(id: string): Observable<void> {
    debugger
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllAssets(): Observable<Asset[]> {
 
    return this.http.get<Asset[]>(`${this.baseUrl}/list`);
  }

}

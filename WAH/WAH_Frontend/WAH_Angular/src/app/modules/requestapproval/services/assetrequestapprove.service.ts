import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetRequestCreateDto } from '../../../shared/Model/assetrequestapprove';

@Injectable({
  providedIn: 'root'
})
export class AssetrequestapproveService {

  baseUrl = 'https://localhost:7126/api/AssetRequest';
  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  updateStatus(requestId: string, status: 'Approved' | 'Rejected'): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-status/${requestId}?status=${status}`, {});
  }
   createRequest(requestData: AssetRequestCreateDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, requestData);
  }
}

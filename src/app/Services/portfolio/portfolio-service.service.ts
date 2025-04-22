import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioServiceService {
   private baseUrl ='http://13.61.180.100:3000/api/v1/portfolio'
  constructor(private http: HttpClient) { }
  getSectionItems(section: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${section}`);
  }

  createSectionItem(section: string, data: any) {
    return this.http.post<any>(`${this.baseUrl}/${section}`, data);
  }
}

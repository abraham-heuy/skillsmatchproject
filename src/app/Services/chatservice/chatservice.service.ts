import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
  private apiUrl =  'http://13.61.180.100:3000/api/v1/chat/chatroute' 
  private resultApi= 'http://13.61.180.100:3000/api/v1/chat/matched-candidates'

  constructor(private http: HttpClient) { }
  getResponse(message: string): Observable<any> {
    // Define the payload, including user info if needed
    const payload = {
      message: message,
      userType: 'candidate' // Adjust according to the context

    };

    return this.http.post<any>(this.apiUrl, payload);
  }
  getResponseRecruiter(message: string): Observable<any> {
    // Define the payload, including user info if needed
    const payload = {
      message: message,
      userType: 'recruiter' // Adjust according to the context

    };

    return this.http.post<any>(this.apiUrl, payload);
  }

  // Add this to your JobService
  getMatchedCandidates(recruiterId: number): Observable<any> {
    return this.http.get<any>(`${this.resultApi}/${recruiterId}`);
  }


}

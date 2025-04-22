import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
export interface Interview {
  id?: number;
  candidate_name: string;
  user_id: number;
  job_id: number;
  interview_date: string;
  interview_time: string;
  mode: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private baseUrl = 'http://13.61.180.100:3000/api/v1/interviews'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  getAllInterviews(): Observable<Interview[]> {
    return this.http.get<Interview[]>(this.baseUrl);
  }

  createInterview(interview: Interview): Observable<Interview> {
    return this.http.post<Interview>(this.baseUrl, interview);
  }

  updateInterviewStatus(id: number, status: string): Observable<Interview> {
    return this.http.put<Interview>(`${this.baseUrl}/${id}/status`, { status });
  }
}

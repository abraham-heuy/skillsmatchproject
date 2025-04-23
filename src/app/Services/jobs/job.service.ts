import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://13.51.48.201:3000/api/v1/jobs'; // Base URL for jobs
  private filterUrl = 'http://13.51.48.201:3000/api/v1/filters/filter-jobs'; // URL for filtering jobs
  private filterCandidateUrl = 'http://13.51.48.201:3000/api/v1/filters/filter-candidates';

  constructor(private http: HttpClient) { }

  // Get all jobs
  getAllJobs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Create a job
  createJob(job: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createJob`, job);
  }

  // Get a job by ID
  getJobById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update a job
  updateJob(id: number, job: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, job);
  }

  // Delete a job
  deleteJob(jobId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${jobId}`);
  }

  // Filter the jobs functionality
  filterJobs(title: string, location: string): Observable<any> {
    const params = new HttpParams()
      .set('title', title)
      .set('location', location);

    return this.http.get<any>(this.filterUrl, { params });
  }
  filterCandidates(title: string, location: string): Observable<any> {
    const params = new HttpParams()
      .set('title', title)
      .set('location', location);

    return this.http.get<any>(this.filterCandidateUrl, { params });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { JobService } from '../Services/jobs/job.service';


@Component({
  selector: 'app-landingpage',
  imports: [ CommonModule, RouterLink, FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

  // inject the router service into the constructor of the component
  constructor(private router: Router,private jobService: JobService) {}
  jobs: any[] = [];
  titleFilter: string = '';
  locationFilter: string = '';
  noJobsFound: boolean = false;

  

  ngOnInit(): void {
    this.loadAllJobs();
  }
 
  loadAllJobs(): void {
    this.jobService.getAllJobs().subscribe(data => {
      this.jobs = data;
      this.noJobsFound = this.jobs.length === 0;
    });
  }

  onSearch(): void {
    if (!this.titleFilter && !this.locationFilter) {
      this.loadAllJobs();
    } else {
      this.jobService.filterJobs(this.titleFilter, this.locationFilter).subscribe(data => {
        this.jobs = data.jobs;
        this.noJobsFound = this.jobs.length ===0;
      });
    }
  }



onPostJob() {
  localStorage.setItem('redirectTo', 'recruiter');
  this.router.navigate(['/login']); 
} 
onRegister(){
  localStorage.setItem('redirectTo', 'candidate');
  this.router.navigate(['/login']); 
}
onadmin(){
  localStorage.setItem('redirectTo', 'admin');
  this.router.navigate(['/login']); 
}
  testimonials = [
    { quote: "This platform really helped me find my dream job!", author: "John Doe" },
    { quote: "Amazing experience! Super easy and fast.", author: "Jane Smith" },
    { quote: "I landed a great role within a week. Highly recommend!", author: "Alex Kimani" }
  ];

  
}

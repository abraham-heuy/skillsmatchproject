import { Component } from '@angular/core';

@Component({
  selector: 'app-work-profile',
  imports: [],
  templateUrl: './work-profile.component.html',
  styleUrl: './work-profile.component.css'
})
export class WorkProfileComponent {
  job = {
    title: 'Senior UX Designer',
    company: 'Facebook',
    salary: '$100,000 - $150,000',
    location: 'Remote',
    jobType: 'Full-time',
    experience: 'Senior',
    description: `
      We are looking for a talented Senior UX Designer to help us create exceptional user experiences.
      As a key part of our team, you will have the opportunity to design innovative products that
      impact millions of users worldwide.
    `,
    relatedJobs: [
      'Technical Support Specialist',
      'Marketing Manager',
      'Junior UX Designer'
    ]}

}

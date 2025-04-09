import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recruiter',
  imports: [CommonModule],
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.css'
})
export class RecruiterComponent {

  dropdownVisible: boolean = false;
   toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible
   }
  jobs = [
    {
      title: 'Software Engineer',
      company: 'Google Inc.',
      location: 'Remote',
      salary: '$80,000 - $120,000'
    },
    {
      title: 'Graphic Designer',
      company: 'Adobe Inc.',
      location: 'New York, NY',
      salary: '$60,000 - $90,000'
    },
    {
      title: 'Data Scientist',
      company: 'Facebook',
      location: 'San Francisco, CA',
      salary: '$100,000 - $150,000'
    }] 

    }

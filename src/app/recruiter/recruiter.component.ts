import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recruiter',
  imports: [CommonModule, RouterLink],
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.css'
})
export class RecruiterComponent {
  chatbotVisible: boolean = false;
  
  toggleChatbot() {
    this.chatbotVisible = !this.chatbotVisible;
  }
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

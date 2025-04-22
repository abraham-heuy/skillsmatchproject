import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JobService } from '../Services/jobs/job.service';
import { FormsModule } from '@angular/forms';
import { ChatserviceService } from '@app/app/Services/chatservice/chatservice.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user.component.html', 
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private router: Router, private jobService: JobService,private chatService: ChatserviceService) {}
  userMessage: string = '';
  chatMessages: any[] = [];
  
  // Method to send message to backend
  sendMessage() {
    if (!this.userMessage.trim()) return;
  
    // Push user message to UI
    this.chatMessages.push({ sender: 'user', message: this.userMessage });
  
    const userText = this.userMessage;
    this.userMessage = ''; // clear input
  
    this.chatService.getResponse(userText).subscribe((res: any) => {
      // If res is an object/array, extract and format message
      let botReply = '';
      if (Array.isArray(res.data)) {
        this.chatMessages.push({
          sender: 'bot',
          type: 'jobList',
          jobs: res.data // Save full job objects
        });
      } else if (typeof res === 'object') {
        this.chatMessages.push({
          sender: 'bot',
          type: 'text',
          message: JSON.stringify(res, null, 2)
        });
      } else {
        this.chatMessages.push({
          sender: 'bot',
          type: 'text',
          message: res.toString()
        });
      }
      
    });
  }
  
  jobs: any[] = [];
  titleFilter: string = '';
  locationFilter: string = '';
  noJobsFound: boolean = false;

  ngOnInit(): void {
    this.loadAllJobs();
  }

  loadAllJobs(): void {
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
      this.noJobsFound = this.jobs.length === 0;
    });
  }

  onSearch(): void {
    if (!this.titleFilter && !this.locationFilter) {
      this.loadAllJobs();
    } else {
      this.jobService.filterJobs(this.titleFilter, this.locationFilter).subscribe((data) => {
        this.jobs = data.jobs;
        this.noJobsFound = this.jobs.length === 0;
      });
    }
  }



   dropdownVisible: boolean = false;
   toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible
   }
   chatbotVisible: boolean = false;

toggleChatbot() {
  this.chatbotVisible = !this.chatbotVisible;
}

}


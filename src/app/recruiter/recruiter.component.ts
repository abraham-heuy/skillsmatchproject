import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobService } from '../Services/jobs/job.service';
import { FormsModule } from '@angular/forms';
import { ChatserviceService } from '../Services/chatservice/chatservice.service';

@Component({
  selector: 'app-recruiter',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.css'
})
export class RecruiterComponent {
  candidates: any[] = [];  
  chatbotVisible: boolean = false;
  titleFilter: string = '';
  locationFilter: string = '';
  noCandidateFound: boolean = false;
  userMessage: string = '';
  chatMessages: any[] = [];
  constructor(private jobService: JobService, private chatService: ChatserviceService) {}
  ngOnInit() {
    this.loadFilteredCandidates();

  }

  toggleChatbot() {
    this.chatbotVisible = !this.chatbotVisible;
  }
  dropdownVisible: boolean = false;
   toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible

   }
   // to filter the candidates? 
   loadFilteredCandidates() {
    const title = this.titleFilter.trim();
    const location = this.locationFilter.trim();
  
    this.jobService.filterCandidates(title, location).subscribe({
      next: (data) => {
        this.candidates = data.candidates;
        this.noCandidateFound = this.candidates.length ===0;
      },
      error: (error) => {
        console.error('Error fetching candidates:', error);
      }
    });
  }

  
  // Method to send message to backend
  sendMessage() {
    if (!this.userMessage.trim()) return;
  
    // Push user message to UI
    this.chatMessages.push({ sender: 'user', message: this.userMessage });
  
    const userText = this.userMessage;
    this.userMessage = ''; // clear input
  
    this.chatService.getResponseRecruiter(userText).subscribe((res: any) => {
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
 

  
}

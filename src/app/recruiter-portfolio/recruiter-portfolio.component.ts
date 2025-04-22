import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { JobService } from '@app/app/Services/jobs/job.service';
import { ChatserviceService } from '../Services/chatservice/chatservice.service';
import { Interview, InterviewService } from '../Services/Interview/interview.service';
interface Job {
  id?: number;
  title: string;
  description: string;
  company_name: string
  recruiter_id: number;
  location: string;
  required_skills: string;
}
@Component({
  selector: 'app-recruiter-portfolio',
  imports: [CommonModule, FormsModule, NgChartsModule, FullCalendarModule],
  templateUrl: './recruiter-portfolio.component.html',
  styleUrl: './recruiter-portfolio.component.css'
})

export class RecruiterPortfolioComponent {

 selectedSection = 'PostJob';
activePopup = '';
activePopupTitle = '';
uploadMethod = 'dragdrop';
jobPosts: Job[] = [];
aiResponse = '';
userQuery = '';
matchedCandidates: any[] = [];
recruiterId: number = 2; 
interviews: Interview[] = [];
selectedInterview: Interview | null = null;


// New Job object for form binding
newJob = {
  title: '',
  description: '',
  company_name: '',
  recruiter_id: 2,
  location: '',
  required_skills: ''
};
//new interview object for job binding: 
newInterview: Interview = {
candidate_name: '',
  user_id: 3,         
  job_id: 5,          
  interview_date: '',
  interview_time: '',
  mode: ''
};


constructor(private jobService: JobService, private chatservice: ChatserviceService, private interviewService: InterviewService) { }

ngOnInit(): void {
  this.fetchJobs();

  const recruiterId: number = 2; 
  this.chatservice.getMatchedCandidates(recruiterId).subscribe({
    next: (data) => {
      this.matchedCandidates = data.matchedCandidates; // or `data`, depending on API structure
    },
    error: (err) => {
      console.error('Failed to load candidates', err);
    }
  });

  this.loadInterviews();
}
loadMatchedCandidates() {
  // Use 'this.recruiterId' to access the class property
  this.chatservice.getMatchedCandidates(this.recruiterId).subscribe({
    next: (res) => {
      this.matchedCandidates = res.matchedCandidates;
    },
    error: (err) => {
      console.error('Error loading matched candidates:', err);
    }
  });
}
loadInterviews() {
  this.interviewService.getAllInterviews().subscribe({
    next: (data) => {
      this.interviews = data;
      this.updateCalendarEvents(); // Update calendar events after loading interviews
    },
    error: (err) => {
      console.error('Error fetching interviews:', err);
    }
  });
}
updateCalendarEvents() {
  // Map interviews to calendar events format
  this.calendarEvents = this.interviews.map(interview => ({
    title: interview.candidate_name, // Name of the candidate or interview title
    date: interview.interview_date, // Interview date
    description: `${interview.interview_time} - ${interview.mode}`, // Interview time and mode (online/onsite)
  }));

  // Refresh the calendar events with updated data
  this.calendarOptions = {
    ...this.calendarOptions,
    events: this.calendarEvents
  };
}




goBack(): void {
  window.history.back();
}

// Fetch jobs from API
fetchJobs(): void {
  this.jobService.getAllJobs().subscribe(
    (jobs) => {
      this.jobPosts = jobs;
    },
    (error) => {
      console.error('Error fetching jobs:', error);
    }
  );
}

// Submit a new job post
submitJob(event: Event): void {
  event.preventDefault();  // prevents page reload

  // Ensure required_skills is always a string before splitting
  const jobToSend = {
    ...this.newJob,
    required_skills: (this.newJob.required_skills || '')
      .split(',')
      .map(skill => skill.trim())
      .join(',')
  };

  this.jobService.createJob(jobToSend).subscribe(
    (job) => {
      this.jobPosts.push(job);
      this.closePopup();
      // Reset the form
      this.newJob = {
        title: '',
        description: '',
        company_name: '',
        recruiter_id: 2,
        location: '',
        required_skills: ''
      };
    },
    (error) => {
      console.error('Error creating job:', error);
    }
  );
}


// Delete job post
deleteJob(jobId: number): void {
  this.jobService.deleteJob(jobId).subscribe(
    () => {
      this.jobPosts = this.jobPosts.filter(job => job.id !== jobId);
    },
    (error) => {
      console.error('Error deleting job:', error);
    }
  );
}


// Edit an existing job post
editJob(job: any): void {
  this.newJob = { ...job };
  this.activePopup = 'PostJob';
  this.activePopupTitle = 'Update Job';
}





// Sample analytics
analytics = { reviewed: 120, interviewed: 25, filled: 10 };

// Chart data
lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Total Candidates Reviewed',
      data: [100, 110, 120, 130, 140],
      fill: false,
      borderColor: '#007bff',
      tension: 0.1
    },
    {
      label: 'Interviews Conducted',
      data: [20, 25, 28, 30, 32],
      fill: false,
      borderColor: '#28a745',
      tension: 0.1
    },
    {
      label: 'Positions Filled',
      data: [5, 7, 9, 10, 11],
      fill: false,
      borderColor: '#dc3545',
      tension: 0.1
    }
  ]
};

lineChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        }
      }
    }
  }
};

// UI state control
toggleSection(section: string): void {
  this.selectedSection = section;
}

openPopup(section: string): void {
  this.activePopup = section;
  this.activePopupTitle = `Add ${section.replace(/([A-Z])/g, ' $1').trim()}`;
}

closePopup(): void {
  this.activePopup = '';
}



calendarEvents = this.interviews.map(interview => ({
  title: interview.candidate_name,
  date: interview.interview_date,
  description: `${interview.interview_time} - ${interview.mode}`
}));



onDateClick(event: any): void {
  const clickedDate = event.dateStr;
  // Format interview date (if necessary)
  const interview = this.interviews.find(i => {
    const interviewDate = new Date(i.interview_date).toISOString().split('T')[0];  // Convert to YYYY-MM-DD
    return interviewDate === clickedDate;
  });
  
  this.selectedInterview = interview || null;
}



openPopup1(section: string): void {
  // Reserved for future popup logic
}

closePopup1(): void {
  this.selectedInterview = null;
}

calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin, interactionPlugin],
  events: this.calendarEvents, // Use the dynamic calendar events
  dateClick: this.onDateClick.bind(this)
};


// Simple chatbot
userMessage: string = '';
chatMessages: any[] = [];

  sendQuery() {
    if (!this.userMessage.trim()) return;
  
    // Push user message to UI
    this.chatMessages.push({ sender: 'user', message: this.userMessage });
  
    const userText = this.userMessage;
    this.userMessage = ''; // clear input
  
    this.chatservice.getResponseRecruiter(userText).subscribe((res: any) => {
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

  createNewInterview(newInterviewData: Interview) {
    this.interviewService.createInterview(newInterviewData).subscribe({
      next: (createdInterview: Interview) => {
        this.interviews.push(createdInterview);
        this.calendarEvents.push({
          title: createdInterview.candidate_name,
          date: createdInterview.interview_date,
          description: `${createdInterview.interview_time} - ${createdInterview.mode}`
        });
      },
      error: (err) => {
        console.error('Failed to create interview:', err);
      }
    });
  }
  //submit the form to create a new interview? 
  submitInterview(event: Event): void {
    event.preventDefault();
  
    // For example purposes, you can hardcode or dynamically assign job_id and user_id
    this.newInterview.user_id = this.recruiterId;
    this.newInterview.job_id = this.jobPosts[0]?.id || 1; // Assume first job, or set one explicitly
  
    this.createNewInterview(this.newInterview);
  
    // Reset form
    this.newInterview = {
      candidate_name: '',
      user_id: this.recruiterId,
      job_id: 1,
      interview_date: '',
      interview_time: '',
      mode: ''
    };
  
    this.closePopup();
  }
  

  

  updateInterviewStatus(id: number, status: string) {
    this.interviewService.updateInterviewStatus(id, status).subscribe({
      next: (updated) => {
        this.loadInterviews(); // Refresh list
      },
      error: (err) => {
        console.error('Failed to update status:', err);
      }
    });
  }



 
}

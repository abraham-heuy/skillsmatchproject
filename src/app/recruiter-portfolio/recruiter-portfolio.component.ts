import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({ 
  selector: 'app-recruiter-portfolio',
  imports: [CommonModule, FormsModule, NgChartsModule, FullCalendarModule],
  templateUrl: './recruiter-portfolio.component.html',
  styleUrl: './recruiter-portfolio.component.css'
}) 
export class RecruiterPortfolioComponent {

  goBack():void{
    window.history.back();  
 }  
  selectedSection = 'PostJob';
activePopup = '';
activePopupTitle = '';
uploadMethod = 'dragdrop';
jobPosts = [
  {
    title: 'Frontend Developer',
    skills: 'Angular, TypeScript, HTML, CSS',
    description: 'We are looking for a skilled frontend developer to join our product team.'
  },
  {
    title: 'Backend Developer',
    skills: 'Node.js, Express, MongoDB',
    description: 'Build scalable backend services and REST APIs for our web platform.'
  },
  {
    title: 'Data Analyst',
    skills: 'Python, SQL, Power BI',
    description: 'Analyze business data and generate insights to support decision-making.'
  }
];

matchedCandidates = [
  {
    name: 'Jane Wanjiku',
    skills: ['Angular', 'TypeScript', 'RxJS']
  },
  {
    name: 'Brian Otieno',
    skills: ['Python', 'Machine Learning', 'Data Analysis']
  },
  {
    name: 'Amina Yusuf',
    skills: ['React', 'Node.js', 'Express']
  }
];


analytics = {
  reviewed: 120,
  interviewed: 25,
  filled: 10
};

// Line chart data for hiring analytics
lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May'], // Labels representing time (could be months)
  datasets: [
    {
      label: 'Total Candidates Reviewed',
      data: [100, 110, 120, 130, 140], // Example data over time
      fill: false,
      borderColor: '#007bff',
      tension: 0.1
    },
    {
      label: 'Interviews Conducted',
      data: [20, 25, 28, 30, 32], // Example data over time
      fill: false,
      borderColor: '#28a745',
      tension: 0.1
    },
    {
      label: 'Positions Filled',
      data: [5, 7, 9, 10, 11], // Example data over time
      fill: false,
      borderColor: '#dc3545',
      tension: 0.1
    }
  ]
};

// Line chart options
lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem: any) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`; // Show the actual value in tooltip
        }
      }
    }
  }
};
aiResponse = '';

toggleSection(section: string) {
  this.selectedSection = section;
}

openPopup(section: string) {
  this.activePopup = section;
  this.activePopupTitle = `Add ${section.replace(/([A-Z])/g, ' $1').trim()}`;
}

closePopup() {
  this.activePopup = '';
}

submitJob(event: Event) {
  event.preventDefault();
  // Push to jobPosts[], close modal
}

submitInterview(event: Event) {
  event.preventDefault();
  // Push to interviews[], close modal
}
interviews = [
  {
    candidate: 'Alice Karani',
    date: '2025-04-15',
    time: '10:00 AM',
    mode: 'Online'
  },
  {
    candidate: 'Brian Mwangi',
    date: '2025-04-16',
    time: '2:00 PM',
    mode: 'In-Person'
  },
  {
    candidate: 'Cynthia Wanjiku',
    date: '2025-04-17',
    time: '11:30 AM',
    mode: 'Phone Call'
  }
];

calendarEvents = this.interviews.map(interview => ({
  title: interview.candidate,
  date: interview.date, // Make sure the date format matches FullCalendar's requirements
  description: `${interview.time} - ${interview.mode}`
}));

selectedInterview: any = null;

// Handle calendar date click
onDateClick(event: any) {
  const clickedDate = event.dateStr; // e.g., '2025-04-15'
  const interview = this.interviews.find(i => i.date === clickedDate);
  
  if (interview) {
    this.selectedInterview = interview;
  } else {
    this.selectedInterview = null;
  }
}

// Open the interview details in a popup
openPopup1(section: string) {
  // Logic for opening the popup to schedule a new interview (e.g., a form)
}

// Close the popup
closePopup1() {
  this.selectedInterview = null;
}
calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',  // Default view
  plugins: [dayGridPlugin, interactionPlugin],  // Use the imported plugins here
  events: this.calendarEvents,
  dateClick: this.onDateClick.bind(this)
}; 
userQuery = '';  
   
sendQuery() {
  if (this.userQuery.trim()) {
    // Simulate AI response
    this.aiResponse = `SKEELBot Response to: "${this.userQuery}"`;
    this.userQuery = '';
  }
}


}

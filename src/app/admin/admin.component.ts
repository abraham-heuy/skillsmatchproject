import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';  // Import ng2-charts
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  selectedSection: string = 'ManageUsers';

  // Chart.js bar chart data
  barChartData = {
    labels: ['January', 'February', 'March', 'April'], // X-axis labels
    datasets: [
      {
        label: 'Applications Received',
        data: [1200, 1900, 3000, 2500], // Dummy data
        backgroundColor: '#007bff',
        hoverBackgroundColor: '#0056b3',
      },
    ],
  };

  // Chart.js chart options
  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: {
      x: {
        title: { display: true, text: 'Months' },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: 'Applications' },
        beginAtZero: true,
      },
    },
  };

  

  performance = {
    recruiter: 45,
    users: 85,
    chatbot: 92,
  };

  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Recruiter', 'Users', 'Chatbot'], // Labels for the pie slices
    datasets: [
      {
        label: 'Performance Metrics',
        data: [45, 85, 92], // Pie chart values
        backgroundColor: ['#007bff', '#28a745', '#dc3545'], // Colors for each slice
      },
    ],
  };

  // Pie Chart Options
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw}%`, // Display percentage
        },
      },
    },
  };

  toggleSection(section: string) {
    this.selectedSection = section;
  }

  dummyUsers = [
    { name: 'John Doe', email: 'johndoe@example.com', expertise: 'React Expert', location: 'Dhaka, Bangladesh' },
    { name: 'Jane Smith', email: 'janesmith@example.com', expertise: 'Python Developer', location: 'Nairobi, Kenya' },
  ];

  dummyStats = {
    liveJobs: '1,75,324',
    candidates: '38,471,54',
    newJobs: '7,532',
    companies: '97,354',
  };

  mostReviewedJobs = [
    { title: 'Senior C++ Developer', views: 200 },
    { title: 'Senior Python Developer', views: 233 },
  ];

  hiringAnalytics = {
    barGraphData: [6, 7, 5, 4],
    applications: 2588,
    changePercentage: 2.1,
  };
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';  // Import ng2-charts
import { ChartData, ChartOptions } from 'chart.js';
import { UsersService, User} from '@app/app/Services/users/users.service';  // Import the UserService

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedSection: string = 'ManageUsers';

  // Data for charts
  barChartData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Applications Received',
        data: [1200, 1900, 3000, 2500],
        backgroundColor: '#007bff',
        hoverBackgroundColor: '#0056b3',
      },
    ],
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: {
      x: { title: { display: true, text: 'Months' }, grid: { display: false } },
      y: { title: { display: true, text: 'Applications' }, beginAtZero: true },
    },
  };

  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Recruiter', 'Users', 'Chatbot'],
    datasets: [
      {
        label: 'Performance Metrics',
        data: [45, 85, 92],
        backgroundColor: ['#007bff', '#28a745', '#dc3545'],
      },
    ],
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
  };

  performance = { recruiter: 45, users: 85, chatbot: 92 };

  // Store users fetched from API
  users: User[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    // Fetch users when the component initializes
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data; // Populate the users array with data from the API
      },
      (error) => {
        console.error('Error fetching users:', error);
        // You can handle error messages here if you want to display them
      }
    );
  }
  confirmDelete(userId: number, userName: string): void {
    const confirmation = window.confirm(`Are you sure you want to delete ${userName}?`);

    if (confirmation) {
      this.deleteUser(userId);
    }
  }
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        // Remove user from the list after successful deletion
        this.users = this.users.filter((user) => user.id !== userId);
        alert('User deleted successfully!');
      },
      (error) => {
        alert('Failed to delete user!');
      }
    );
  }

  toggleSection(section: string) {
    this.selectedSection = section;
  }

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

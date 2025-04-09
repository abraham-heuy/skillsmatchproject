import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  selectedSection: string = 'ManageUsers'; // Default active section

  toggleSection(section: string) {
    this.selectedSection = section; 
  }
}

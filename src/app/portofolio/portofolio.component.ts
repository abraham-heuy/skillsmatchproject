import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-portofolio',
  imports: [CommonModule],
  templateUrl: './portofolio.component.html',
  styleUrl: './portofolio.component.css'
})
export class PortofolioComponent {
  selectedSection: string = 'Projects'; 

  toggleSection(section: string) {
    this.selectedSection = section;
  }
}

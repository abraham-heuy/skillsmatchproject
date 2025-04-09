import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-portofolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css']
})
export class PortofolioComponent {


  // top nav bar button 
  goBack():void{
     window.history.back();
  }
  // selected sections code
  selectedSection: string = 'Projects'; 
  activePopup: string | null = null;
  activePopupTitle: string = '';
  uploadMethod: 'dragdrop' | 'browse' = 'dragdrop';
  uploadedCVFile: File | null = null;
  uploadedCVName: string | null = null;

  projects = [
    {
      title: 'E-commerce Platform',
      tech: 'React, Node.js, MongoDB',
      summary: 'A full-stack web app for online shopping with secure authentication and payment integration.'
    },
    {
      title: 'Portfolio Website',
      tech: 'Angular, Firebase, Tailwind',
      summary: 'A personal responsive portfolio to showcase projects, skills, and contact information.'
    }
  ];

  // 🔀 Navigation
  toggleSection(section: string): void {
    this.selectedSection = section;
  }

  // 🔓 Open popup
  openPopup(section: string): void {
    this.activePopup = section;
    this.uploadMethod = 'dragdrop'; // default tab
    this.activePopupTitle = `Add ${section}`;
  }

  // ❌ Close popup
  closePopup(): void {
    this.activePopup = null;
    this.uploadedCVFile = null;
    this.uploadedCVName = null;
  }

  // 🖱️ Drag-and-drop logic
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.uploadedCVFile = event.dataTransfer.files[0];
      this.uploadedCVName = this.uploadedCVFile.name;
    }
  }

  // 📁 File browse logic
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedCVFile = input.files[0];
      this.uploadedCVName = this.uploadedCVFile.name;
    }
  }

  // ⬆️ Submit CV
  submitCV(): void {
    if (this.uploadedCVFile) {
      console.log('Uploading CV:', this.uploadedCVFile.name);
      alert(`CV "${this.uploadedCVFile.name}" uploaded successfully!`);
      this.closePopup();
    } else {
      alert('Please select a CV file to upload.');
    }
  }

  // 📝 Section form submission handlers
  submitProject(event: Event): void {
    event.preventDefault();
    this.closePopup();
  }

  submitExperience(event: Event): void {
    event.preventDefault();
    this.closePopup();
  }

  submitEducation(event: Event): void {
    event.preventDefault();
    this.closePopup();
  }

  submitCertification(event: Event): void {
    event.preventDefault();
    this.closePopup();
  }

  submitReference(event: Event): void {
    event.preventDefault();
    this.closePopup();
  }
}

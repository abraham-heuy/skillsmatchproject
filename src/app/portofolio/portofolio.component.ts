import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioServiceService } from '@app/app/Services/portfolio/portfolio-service.service';

@Component({
  selector: 'app-portofolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css'],
})
export class PortofolioComponent {
  // Top nav bar button
  goBack(): void {
    window.history.back();
  }

  selectedSection: string = 'Projects';
  activePopup: string | null = null;
  activePopupTitle: string = '';
  uploadMethod: 'dragdrop' | 'browse' = 'dragdrop';
  uploadedCVFile: File | null = null;
  uploadedCVName: string | null = null;
  formData: any = {};

  // Store data per section
  sectionsData: { [key: string]: any[] } = {
    Projects: [],
    Experience: [],
    Education: [],
    Certifications: [],
    References: [],
    CVUpload: [],
  };

  constructor(private portfolioService: PortfolioServiceService) {}

  ngOnInit(): void {
    this.loadSection(this.selectedSection);
  }

  toggleSection(section: string): void {
    this.selectedSection = section;
    this.loadSection(section);
  }

  loadSection(section: string): void {
    this.portfolioService.getSectionItems(section).subscribe((data: any) => {
      this.sectionsData[section] = data;
    });
  }

  openPopup(section: string): void {
    this.activePopup = section;
    this.uploadMethod = 'dragdrop';
    this.activePopupTitle = `Add ${section}`;
  }

  closePopup(): void {
    this.activePopup = null;
    this.uploadedCVFile = null;
    this.uploadedCVName = null;
  }

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

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedCVFile = input.files[0];
      this.uploadedCVName = this.uploadedCVFile.name;
    }
  }

  submitCV(): void {
    if (this.uploadedCVFile) {
      console.log('Uploading CV:', this.uploadedCVFile.name);
      alert(`CV "${this.uploadedCVFile.name}" uploaded successfully!`);
      this.closePopup();
    } else {
      alert('Please select a CV file to upload.');
    }
  }

  // Submit methods for each section
  submitSectionData(event: Event, section: string): void {
    event.preventDefault();
    const data = {
      ...this.formData,
      user_id: 3, // Set dynamic user_id here
      section: section,
    };

    this.portfolioService.createSectionItem(section, data).subscribe(
      (response) => {
        console.log(`${section} added:`, response);
        this.closePopup();
      },
      (error) => {
        console.error(`Error adding ${section}:`, error);
      }
    );
  }

  // Convenience methods for submit actions
  submitExperience(event: Event): void {
    this.submitSectionData(event, 'Experience');
  }

  submitProject(event: Event): void {
    this.submitSectionData(event, 'Projects');
  }

  submitEducation(event: Event): void {
    this.submitSectionData(event, 'Education');
  }

  submitCertification(event: Event): void {
    this.submitSectionData(event, 'Certifications');
  }

  submitReference(event: Event): void {
    this.submitSectionData(event, 'References');
  }
}

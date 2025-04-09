import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginForm: boolean = true;

  // Login form fields
  newEmail: string = '';
  password: string = '';

  // Register form fields
  newName: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  // Toggle between login and register form
  toggleForm(): void {
    this.isLoginForm = !this.isLoginForm;
    this.passwordMismatch = false; // Reset error when switching
  }

  // Login form submission
  onSubmitLogin(form: any): void {
    if (form.valid) {
      console.log('Logging in with:', this.newEmail, this.password);
      // TODO: Add login service call here
    } else {
      console.log('Login form is invalid');
    }
  }

  // Register form submission
  onSubmitRegister(form: any): void {
    if (form.valid) {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }
  
      console.log('Registering with:', {
        name: this.newName,
        email: this.newEmail,
        password: this.newPassword,
      });
  
      // TODO: Add actual registration logic here (API call, etc.)
      this.passwordMismatch = false;
  
      // Optionally reset the form or switch back to login
      form.resetForm();
      this.toggleForm(); // Go back to login form after successful registration
    } else {
      console.log('Register form is invalid');
    }
  }
  
}

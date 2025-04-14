import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
 
  // Dummy users data (Added email to each user)
  users = [
    { id: 1, email: 'admin@example.com', username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, email: 'recruiter@example.com', username: 'recruiter', password: 'recruiter123', role: 'recruiter' },
    { id: 3, email: 'candidate@example.com', username: 'candidate', password: 'candidate123', role: 'candidate' },
  ]; 

  // Track the role for registration
  role: string = 'user';

  constructor(private router: Router) {}

  // Toggle between login and register form
  toggleForm(): void {
    this.isLoginForm = !this.isLoginForm;
    this.passwordMismatch = false; // Reset error when switching
  }

  // Login form submission
  onSubmitLogin(form: any): void {
    if (form.valid) {
      const user = this.users.find(
        (u) => u.email === this.newEmail && u.password === this.password
      );
      
      if (user) {
        alert("Login Successful.Continue.....😊😊😉")
        // Store user role in localStorage for redirection
        localStorage.setItem('userRole', user.role);

        // Redirect based on the stored role
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (user.role === 'recruiter') {
          this.router.navigate(['/recruiter']);
        } else {
          this.router.navigate(['/user']);
        }
      } else {
        console.log('Invalid credentials');
      }
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

      // Assign the role based on the button clicked (this will be set using localStorage)
      this.role = localStorage.getItem('redirectTo') || 'user';

      // Create a new user object (In a real-world app, this would be an API call)
      const newUser = {
        username: this.newName,
        email: this.newEmail,
        password: this.newPassword,
        role: this.role,
      };

      // Save the new user (temporarily adding to the users array)
      this.users.push({
        id: this.users.length + 1,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });

      console.log('Registration successful for:', newUser);

      // Reset form and switch back to the login form
      form.resetForm();
      this.passwordMismatch = false;
      this.toggleForm(); // Go back to login form after successful registration
    } else {
      console.log('Register form is invalid');
    }
  }
}

// login.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/app/Services/auth/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginForm = true;

  // Common Fields
  newEmail = '';
  password = '';

  // Register Fields
  newName = '';
  newPassword = '';
  confirmPassword = '';

  passwordMismatch = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  toggleForm(): void {
    this.isLoginForm = !this.isLoginForm;
    this.resetFields();
  }

  resetFields(): void {
    this.newEmail = '';
    this.password = '';
    this.newName = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordMismatch = false;
    this.errorMessage = '';
  }

  onSubmitLogin(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.newEmail, this.password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          const role = response.user.role_name;
          const selectedRole = localStorage.getItem('redirectTo');

          if (selectedRole && selectedRole !== role) {
            alert(`You selected ${selectedRole} but logged in as ${role}`);
          }

          if (role === 'admin') this.router.navigate(['/admin']);
          else if (role === 'recruiter') this.router.navigate(['/recruiter']);
          else this.router.navigate(['/user']);
        },
        error: () => {
          this.errorMessage = 'Invalid login credentials.';
        }
      });
    }
  }

  onSubmitRegister(form: NgForm): void {
    this.passwordMismatch = false;
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    if (form.valid) {
      const roleMap: { [key: string]: number } = {
        admin: 1,
        recruiter: 2,
        candidate: 3
      };
      const selectedRole = localStorage.getItem('redirectTo') || 'candidate';
      const role_id = roleMap[selectedRole];

      const data = {
        name: this.newName,
        email: this.newEmail,
        password: this.newPassword,
        role_id
      };

      this.authService.register(data).subscribe({
        next: () => {
          alert('Registration successful!');
          this.toggleForm();
        },
        error: () => {
          this.errorMessage = 'Registration failed. Email may already exist.';
        }
      });
    }
  }
}

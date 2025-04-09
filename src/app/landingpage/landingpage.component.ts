import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landingpage',
  imports: [ CommonModule, RouterLink],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

  // inject the router service into the constructor of the component
  constructor(private router: Router){}
onPostJob() {
  localStorage.setItem('redirectTo', 'recruiter');
  this.router.navigate(['/login']); 
} 
onRegister(){
  localStorage.setItem('redirectTo', 'user');
  this.router.navigate(['/login']); 
}
  testimonials = [
    { quote: "This platform really helped me find my dream job!", author: "John Doe" },
    { quote: "Amazing experience! Super easy and fast.", author: "Jane Smith" },
    { quote: "I landed a great role within a week. Highly recommend!", author: "Alex Kimani" }
  ];

  
}

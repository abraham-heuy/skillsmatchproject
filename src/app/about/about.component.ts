import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
   /*  // inject the router service into the constructor of the component
  constructor(private router: Router){}
onPostJob() {
  localStorage.setItem('redirectTo', 'recruiter');
  this.router.navigate(['/login']); 
} 
onRegister(){
  localStorage.setItem('redirectTo', 'user');
  this.router.navigate(['/login']); 
}*/ 
}

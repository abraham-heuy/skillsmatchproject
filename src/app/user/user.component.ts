import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonEngine } from '@angular/ssr/node';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
   dropdownVisible: boolean = false;
   toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible
   }
}

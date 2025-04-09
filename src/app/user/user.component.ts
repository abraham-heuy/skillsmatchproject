import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonEngine } from '@angular/ssr/node';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
   dropdownVisible: boolean = false;
   toggleDropdown(){
    this.dropdownVisible = !this.dropdownVisible
   }
   chatbotVisible: boolean = false;

toggleChatbot() {
  this.chatbotVisible = !this.chatbotVisible;
}

}


import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <h2>User Profile</h2>
    <p><strong>Name:</strong> {{ user?.name }}</p>
    <p><strong>Email:</strong> {{ user?.email }}</p>
  `,
})
export class ProfileComponent {
  user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
}

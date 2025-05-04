import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="loginUser()">
      <input [(ngModel)]="email" name="email" placeholder="Email" required />
      <input [(ngModel)]="password" name="password" placeholder="Password" required type="password" />
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  loginUser() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.email === storedUser.email && this.password === storedUser.password) {
      localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid credentials');
    }
  }
}

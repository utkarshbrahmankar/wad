import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="registerUser()">
      <input [(ngModel)]="user.name" name="name" placeholder="Name" required />
      <input [(ngModel)]="user.email" name="email" placeholder="Email" required />
      <input [(ngModel)]="user.password" name="password" placeholder="Password" required type="password" />
      <button type="submit">Register</button>
    </form>
    <p>Already registered? <a routerLink="/login">Login</a></p>
  `,
})
export class RegistrationComponent {
  user = { name: '', email: '', password: '' };

  constructor(private router: Router) {}

  registerUser() {
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('Registration successful!');
    this.router.navigate(['/login']);
  }
}

import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

export const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
];

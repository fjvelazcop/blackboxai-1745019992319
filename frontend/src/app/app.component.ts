import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow p-4 flex justify-between items-center">
        <div class="text-xl font-bold">Medical Records System</div>
        <div *ngIf="isLoggedIn; else loggedOutLinks" class="flex items-center space-x-4">
          <a *ngIf="userRole === 'admin'" routerLink="/users" class="text-blue-600 hover:underline">Users</a>
          <a *ngIf="userRole === 'doctor'" routerLink="/patients" class="text-blue-600 hover:underline">Patients</a>
          <a *ngIf="userRole === 'doctor'" routerLink="/calendar" class="text-blue-600 hover:underline">Calendar</a>
          <a *ngIf="userRole === 'patient'" routerLink="/my-profile" class="text-blue-600 hover:underline">My Profile</a>
          <a *ngIf="userRole === 'patient'" routerLink="/appointments" class="text-blue-600 hover:underline">Appointments</a>
          <a routerLink="/medical-records" class="text-blue-600 hover:underline">Medical Records</a>
          <button (click)="logout()" class="text-red-600 hover:underline">Logout</button>
        </div>
        <ng-template #loggedOutLinks>
          <a routerLink="/login" class="text-blue-600 hover:underline">Login</a>
        </ng-template>
      </nav>
      <main class="p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        // Decode token to get role or get role from backend/user service
        const token = this.authService.getToken();
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userRole = payload.role;
        }
      } else {
        this.userRole = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

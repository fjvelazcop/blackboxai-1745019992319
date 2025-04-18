import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow p-4 flex justify-between items-center">
        <div class="text-xl font-bold">Medical Records System</div>
        <div>
          <a routerLink="/login" class="mr-4 text-blue-600 hover:underline">Login</a>
          <a routerLink="/doctors" class="mr-4 text-blue-600 hover:underline">Doctors</a>
          <a routerLink="/medical-records" class="text-blue-600 hover:underline">Medical Records</a>
        </div>
      </nav>
      <main class="p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}

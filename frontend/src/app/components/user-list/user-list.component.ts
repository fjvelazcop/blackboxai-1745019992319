import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [
    // Sample data, replace with API call
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: 2, name: 'Dr. Smith', email: 'dr.smith@example.com', role: 'doctor' },
    { id: 3, name: 'Patient One', email: 'patient1@example.com', role: 'patient' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEdit(userId: number): void {
    this.router.navigate(['/users/edit', userId]);
  }

  onDelete(userId: number): void {
    // Implement delete logic here
    alert('Delete user with ID ' + userId);
  }

  onCreate(): void {
    this.router.navigate(['/users/new']);
  }
}

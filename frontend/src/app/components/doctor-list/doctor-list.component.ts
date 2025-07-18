import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors = [
    // Sample data, replace with API call
    { id: 1, name: 'Dr. John Smith', specialty: 'Cardiology', patientsCount: 12 },
    { id: 2, name: 'Dr. Jane Doe', specialty: 'Dermatology', patientsCount: 8 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEdit(doctorId: number): void {
    this.router.navigate(['/doctors/edit', doctorId]);
  }

  onDelete(doctorId: number): void {
    // Implement delete logic here
    alert('Delete doctor with ID ' + doctorId);
  }

  onCreate(): void {
    this.router.navigate(['/doctors/new']);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  patient = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    medicalHistory: 'No known allergies. Previous surgery in 2018.'
  };

  constructor() {}

  ngOnInit(): void {}

  onUpdate(): void {
    alert('Profile updated (dummy)');
  }
}

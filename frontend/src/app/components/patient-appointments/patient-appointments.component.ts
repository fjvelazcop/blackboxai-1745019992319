import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {
  appointments = [
    { id: 1, doctor: 'Dr. John Smith', date: '2024-07-01', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Jane Doe', date: '2024-07-10', time: '02:00 PM', status: 'Pending' }
  ];

  constructor() {}

  ngOnInit(): void {}

  onRequestAppointment(): void {
    alert('Request new appointment (dummy)');
  }

  onCancel(appointmentId: number): void {
    alert('Cancel appointment with ID ' + appointmentId);
  }
}

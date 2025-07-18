import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments = [
    { id: 1, patient: 'John Doe', date: '2024-07-01', time: '10:00 AM', status: 'Pending' },
    { id: 2, patient: 'Jane Smith', date: '2024-07-02', time: '02:00 PM', status: 'Confirmed' }
  ];

  constructor() {}

  ngOnInit(): void {}

  onApprove(appointmentId: number): void {
    alert('Approved appointment with ID ' + appointmentId);
  }

  onReject(appointmentId: number): void {
    alert('Rejected appointment with ID ' + appointmentId);
  }
}

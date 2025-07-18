import { Component } from '@angular/core';

@Component({
  selector: 'app-appointment-request',
  templateUrl: './appointment-request.component.html',
  styleUrls: ['./appointment-request.component.css']
})
export class AppointmentRequestComponent {
  doctors = [
    { id: 1, name: 'Dr. John Smith' },
    { id: 2, name: 'Dr. Jane Doe' }
  ];

  selectedDoctorId: number | null = null;
  date: string = '';
  time: string = '';

  onSubmit(): void {
    if (!this.selectedDoctorId || !this.date || !this.time) {
      alert('Please fill all fields');
      return;
    }
    alert(`Appointment requested with doctor ID ${this.selectedDoctorId} on ${this.date} at ${this.time}`);
    // Reset form
    this.selectedDoctorId = null;
    this.date = '';
    this.time = '';
  }
}

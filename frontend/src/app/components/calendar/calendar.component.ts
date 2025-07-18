import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: 'day' | 'week' | 'month' = 'month';
  doctors = [
    { id: 1, name: 'Dr. John Smith' },
    { id: 2, name: 'Dr. Jane Doe' }
  ];
  selectedDoctorId: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  changeView(view: 'day' | 'week' | 'month'): void {
    this.view = view;
  }

  filterByDoctor(doctorId: number | null): void {
    this.selectedDoctorId = doctorId;
  }
}

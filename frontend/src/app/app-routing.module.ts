import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
// import { MedicalRecordListComponent } from './components/medical-record-list/medical-record-list.component';
// import { MedicalRecordFormComponent } from './components/medical-record-form/medical-record-form.component';

import { AuthGuard } from './services/auth.guard';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientAppointmentsComponent } from './components/patient-appointments/patient-appointments.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: DoctorListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'doctors',
    component: DoctorListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'doctor'] }
  },
  {
    path: 'doctors/new',
    component: DoctorFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'doctors/edit/:id',
    component: DoctorFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  // { 
  //   path: 'medical-records', 
  //   component: MedicalRecordListComponent, 
  //   canActivate: [AuthGuard], 
  //   data: { roles: ['doctor', 'patient'] } 
  // },
  // { 
  //   path: 'medical-records/new', 
  //   component: MedicalRecordFormComponent, 
  //   canActivate: [AuthGuard], 
  //   data: { roles: ['doctor'] } 
  // },
  // { 
  //   path: 'medical-records/edit/:id', 
  //   component: MedicalRecordFormComponent, 
  //   canActivate: [AuthGuard], 
  //   data: { roles: ['doctor'] } 
  // },
  {
    path: 'my-profile',
    component: PatientProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['patient'] }
  },
  {
    path: 'appointments',
    component: PatientAppointmentsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['patient'] }
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
    data: { roles: ['doctor', 'admin'] }
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

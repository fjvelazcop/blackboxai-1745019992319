import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { MedicalRecordListComponent } from './components/medical-record-list/medical-record-list.component';
import { MedicalRecordFormComponent } from './components/medical-record-form/medical-record-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/new', component: DoctorFormComponent },
  { path: 'doctors/edit/:id', component: DoctorFormComponent },
  { path: 'medical-records', component: MedicalRecordListComponent },
  { path: 'medical-records/new', component: MedicalRecordFormComponent },
  { path: 'medical-records/edit/:id', component: MedicalRecordFormComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

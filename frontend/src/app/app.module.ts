import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { MedicalRecordListComponent } from './components/medical-record-list/medical-record-list.component';
import { MedicalRecordFormComponent } from './components/medical-record-form/medical-record-form.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientAppointmentsComponent } from './components/patient-appointments/patient-appointments.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentRequestComponent } from './components/appointment-request/appointment-request.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorListComponent,
    DoctorFormComponent,
    MedicalRecordListComponent,
    MedicalRecordFormComponent,
    UserListComponent,
    UserFormComponent,
    PatientProfileComponent,
    PatientAppointmentsComponent,
    CalendarComponent,
    AppointmentListComponent,
    AppointmentRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, Provider } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/services/auth.interceptor';

const httpInterceptorProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule, HttpClientModule),
    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders
  ]
}).catch(err => console.error(err));

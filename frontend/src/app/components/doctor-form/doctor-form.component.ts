import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
  doctorForm: FormGroup;
  isEditMode = false;
  doctorId: number | null = null;

  specialties = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'General'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialty: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.doctorId = +id;
        // Load doctor data from API or service here
        // For now, populate with dummy data
        this.doctorForm.patchValue({
          name: 'Dr. Sample',
          email: 'doctor@example.com',
          specialty: 'Cardiology'
        });
      }
    });
  }

  onSubmit(): void {
    if (this.doctorForm.invalid) {
      return;
    }
    const doctorData = this.doctorForm.value;
    if (this.isEditMode) {
      // Update doctor API call
      alert('Doctor updated: ' + JSON.stringify(doctorData));
    } else {
      // Create doctor API call
      alert('Doctor created: ' + JSON.stringify(doctorData));
    }
    this.router.navigate(['/doctors']);
  }

  onCancel(): void {
    this.router.navigate(['/doctors']);
  }
}

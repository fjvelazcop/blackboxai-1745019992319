import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;

  roles = ['admin', 'doctor', 'patient'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.userId = +id;
        // Load user data from API or service here
        // For now, populate with dummy data
        this.userForm.patchValue({
          name: 'Sample User',
          email: 'sample@example.com',
          role: 'doctor',
          password: ''
        });
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    const userData = this.userForm.value;
    if (this.isEditMode) {
      // Update user API call
      alert('User updated: ' + JSON.stringify(userData));
    } else {
      // Create user API call
      alert('User created: ' + JSON.stringify(userData));
    }
    this.router.navigate(['/users']);
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}

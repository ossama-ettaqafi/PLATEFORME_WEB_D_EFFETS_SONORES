import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessage: string = '';
  selectedFile: File | undefined;
  currentDate: Date = new Date();

  constructor(
    private titleService: Title,
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      bio: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      image_file: [null, Validators.required],
      image_path: [null],
      join_date: [this.currentDate.toDateString()],
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("meow-it | Page d'inscription");
  }

  onSubmit(form: FormGroupDirective): void {
    if (this.registrationForm?.valid) {
      this.errorMessage = '';

      const formData = new FormData();

      // Append form data to the FormData object
      formData.append('name', this.registrationForm.get('name')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('password', this.registrationForm.get('password')?.value);
      formData.append('bio', this.registrationForm.get('bio')?.value);
      formData.append('country', this.registrationForm.get('country')?.value);
      formData.append('city', this.registrationForm.get('city')?.value);
      formData.append(
        'join_date',
        this.registrationForm.get('join_date')?.value
      );

      // Append the image file if available
      if (this.selectedFile) {
        formData.append('image_file', this.selectedFile);
      }

      this.registrationService.register(formData).subscribe(
        (response) => {
          // Handle success response from Laravel API
          // console.log('Registration successful:', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          if (
            error.status === 422 &&
            error.error.error === 'Email already exists'
          ) {
            this.errorMessage =
              'Email already exists. Please choose a different email.';
          } else {
            this.errorMessage = 'Registration failed. Please try again later.';
          }
        }
      );
    } else {
      this.errorMessage =
        'Tous les champs doivent être remplis et une image doit être sélectionnée.';
    }
  }

  triggerFileInput(): void {
    document.getElementById('upload-input')?.click();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.registrationForm.patchValue({ image_file: this.selectedFile });
    }
  }
}

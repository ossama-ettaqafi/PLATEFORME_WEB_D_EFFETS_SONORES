import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RegistrationService } from 'src/app/services/registration.service';

export interface FormData {
  fullname: string;
  email: string;
  password: string;
  image: File | null;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {

  formData: FormData = {
    fullname: '',
    email: '',
    password: '',
    image: null,
  };

  errorMessage: string = '';
  selectedFile: File | undefined;

  constructor(
    private titleService: Title,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("meow-it | Page d'inscription");
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.errorMessage = '';

      if (!this.isEmailValid(this.formData.email)) {
        this.errorMessage = 'Veuillez fournir une adresse e-mail valide.';
        return;
      }

      // Call the registration service to send data to Laravel API
      this.registrationService.register(this.formData).subscribe(
        (response) => {
          // Handle success response from Laravel API
          console.log('Registration successful:', response);
        },
        (error) => {
          // Handle error response from Laravel API
          console.error('Registration failed:', error);
        }
      );
    } else {
      this.errorMessage =
        'Tous les champs doivent être remplis et une image doit être sélectionnée.';
    }
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    return (
      this.formData.fullname.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.password.trim() !== '' &&
      this.formData.image !== null
    );
  }

  triggerFileInput(): void {
    document.getElementById('upload-input')?.click();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.formData.image = this.selectedFile;
    }
  }
}

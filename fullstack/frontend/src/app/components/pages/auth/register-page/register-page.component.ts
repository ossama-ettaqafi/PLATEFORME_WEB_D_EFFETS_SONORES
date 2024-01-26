import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

interface FormData {
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

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("meow-it | Page d'inscription");
  }

  onSubmit(): void {
    console.log(this.isFormValid());

    if (this.isFormValid()) {
      // Clear previous error messages
      this.errorMessage = '';

      // Validate email format
      if (!this.isEmailValid(this.formData.email)) {
        this.errorMessage = 'Veuillez fournir une adresse e-mail valide.';
        return;
      }

      console.log('Form data:', this.formData);
      console.log('Success message!!');
    } else {
      this.errorMessage =
        'Tous les champs doivent être remplis et une image doit être sélectionnée.';
    }
  }

  isEmailValid(email: string): boolean {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    console.log('Fullname:', this.formData.fullname);
    console.log('Email:', this.formData.email);
    console.log('Password:', this.formData.password);
    console.log('Image:', this.formData.image);

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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.formData.image = file;
      console.log('Selected image path:', file.name);
    }
  }
}

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

  errorMessage: string = ''; // Variable to store error messages

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("meow-it | Page d'inscription");
  }

  onSubmit(): void {
    console.log(this.isFormValid());

    if (this.isFormValid()) {
      // Clear previous error messages
      this.errorMessage = '';

      console.log('Form data:', this.formData);
      console.log('Success message!!');
      // You can send the form data to the server or perform other actions here
    } else {
      this.errorMessage =
        'Tous les champs doivent être remplis et une image doit être sélectionnée.';
    }
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

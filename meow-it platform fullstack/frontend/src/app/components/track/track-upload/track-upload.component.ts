import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-track-upload',
  templateUrl: './track-upload.component.html',
  styleUrls: ['./track-upload.component.css'],
})
export class TrackUploadComponent implements OnInit {
  categories: any;
  successMessage: string = '';
  errorMessage: string = '';
  loggedUserId: number | undefined;

  constructor(public categoryService: CategoryService, private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.loggedUserId = this.sharedService.getLoggedInUserId() ?? undefined;
  }

  formData = {
    image: null,
    audio: null,
    title: '',
    category: '',
  };

  onSubmit() {
    // Check if all required fields are filled
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill in all fields!';
      this.successMessage = ''; // Clear success message if there was one
      return;
    }

    // Access the form data and display it
    console.log('Form Data:', this.formData);

    // Display success message
    this.successMessage = 'Track Uploaded Succefly!';
    this.errorMessage = '';

    // You can also perform any additional logic or API calls here

    this.router.navigate(['/profile', this.loggedUserId]);
  }

  isFormValid(): boolean {
    return (
      this.formData.image !== null &&
      this.formData.audio !== null &&
      this.formData.title !== '' &&
      this.formData.category !== ''
    );
  }


  onImageChange(event: any) {
    // Handle image file change event
    this.formData.image = event.target.files[0];
  }

  onAudioChange(event: any) {
    // Handle audio file change event
    this.formData.audio = event.target.files[0];
  }

  resetForm() {
    // Reset form data and clear file inputs
    this.formData = {
      image: null,
      audio: null,
      title: '',
      category: '',
    };

    // Reset error and success messages
    this.errorMessage = '';
    this.successMessage = '';
  }
}

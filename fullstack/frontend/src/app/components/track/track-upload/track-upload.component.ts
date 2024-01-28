import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { TrackUploadService } from 'src/app/services/track-upload.service';

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
  currentDate: Date = new Date();
  selectedImage: File | undefined;
  selectedAudio: File | undefined;

  constructor(
    public categoryService: CategoryService,
    private router: Router,
    private sharedService: SharedService,
    private trackUploadService: TrackUploadService
  ) {}

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

    const formData = new FormData();
    formData.append('title', this.formData.title);
    formData.append('category', this.formData.category);
    formData.append('release_date', this.currentDate.toDateString());
    formData.append('user_id', String(this.loggedUserId));

    if (this.selectedImage) {
      formData.append('image_file', this.selectedImage);
    }

    if (this.selectedAudio) {
      formData.append('audio_file', this.selectedAudio);
      formData.append('duration', String(this.selectedAudio.size));
    }

    // Call the track upload service to send data to Laravel API
    this.trackUploadService.uploadTrack(formData).subscribe(
      (response) => {
        // Handle success response from Laravel API
        // console.log('Track upload successful:', response);

        // Display success message
        this.successMessage = 'Téléchargé avec succès!';
        this.errorMessage = '';

        // Navigate to the profile page
        this.router.navigate(['/profile', this.loggedUserId]);
      },
      (error) => {
        // Handle error response from Laravel API
        console.error('Track upload failed:', error);

        // Display error message
        this.errorMessage = 'Échec du téléchargement.';
        this.successMessage = ''; // Clear success message if there was one
      }
    );
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
    this.formData.image = event.target.files[0];
    this.selectedImage = event.target.files[0];
  }

  onAudioChange(event: any) {
    this.formData.audio = event.target.files[0];
    this.selectedAudio = event.target.files[0];
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

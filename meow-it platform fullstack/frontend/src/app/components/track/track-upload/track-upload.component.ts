import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-track-upload',
  templateUrl: './track-upload.component.html',
  styleUrls: ['./track-upload.component.css'],
})
export class TrackUploadComponent implements OnInit {

  trackUploadForm!: FormGroup;
  categories: any;

  constructor(
    private fb: FormBuilder,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    // Initialize the form with FormBuilder
    this.trackUploadForm = this.fb.group({
      trackImage: [null, [Validators.required]],
      mp3File: [null, [Validators.required]],
      trackName: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.trackUploadForm.valid) {
      // Form is valid, proceed with submission
      const formData = new FormData();
      formData.append('trackImage', this.trackUploadForm.get('trackImage')?.value as File);
      formData.append('mp3File', this.trackUploadForm.get('mp3File')?.value as File);
      formData.append('trackName', this.trackUploadForm.get('trackName')?.value);
      formData.append('category', this.trackUploadForm.get('category')?.value);

      // Now, you can implement the logic to send this FormData to your backend service
      // for further processing, such as uploading the files.
      console.log(formData);
    } else {
      // Form is invalid, show error messages or take appropriate action
      this.validateAllFormFields(this.trackUploadForm);
    }
  }

  // Helper method to validate all form fields
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  // Helper method to display error messages
  getErrorMessage(controlName: string) {
    const control = this.trackUploadForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }
}

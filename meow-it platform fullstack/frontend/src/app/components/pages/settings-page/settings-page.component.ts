import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadUserImageService } from 'src/app/services/upload-user-image.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  public userId: string | null = null;
  public user: any;  // Update the type based on your user model
  public allUsers: any[] = [];  // Update the type based on your user model
  selectedImagePreview: string | ArrayBuffer | null = null;

  passwordMatchError: boolean = false;
  allFieldsFilled: boolean = true;
  displaySuccessMessage: boolean = false; // Added flag for displaying success message
  displayErrorMessage: boolean = false; // Added flag for displaying error message

  changesSaved: boolean = false;

  constructor(private route: ActivatedRoute,
  private userService: UsersService,
  private uploadUserImageService: UploadUserImageService) {}

  ngOnInit(): void {
    // Subscribe to the route parameters to get the user ID
    this.route.paramMap.subscribe(params => {
      // 'id' should match the route parameter name in your routing configuration
      this.userId = params.get('id');

      // Use the userService to fetch all users
      this.userService.getUsers().subscribe(users => {
        // Find the user with the matching ID
        this.user = users.find(u => u.id == this.userId);
      });
    });

    this.selectedImagePreview = this.user.image_path;
  }

  checkPasswordMatch(): void {
    // Check if passwords match
    this.passwordMatchError = this.user.password !== this.user.repeatPassword;
  }

  saveChanges(form: NgForm): void {
    // Check if all fields are filled
    this.allFieldsFilled = Object.values(this.user).every(value => value !== '');

    // Check if passwords are filled and match
    const passwordsFilledAndMatch = this.user.password && this.user.repeatPassword && this.user.password === this.user.repeatPassword;

    // Additional logic for form submission
    if (passwordsFilledAndMatch && this.allFieldsFilled) {
      // Perform save logic (you may want to update user data, etc.)
      console.log('Form submitted!', form.value);
      this.changesSaved = true; // Set changesSaved to true when changes are successfully saved
      this.displaySuccessMessage = true;
      this.displayErrorMessage = false; // Hide error message
    } else {
      // Set passwordMatchError to true if passwords do not match
      this.passwordMatchError = !passwordsFilledAndMatch;
      this.displayErrorMessage = true;
      this.displaySuccessMessage = false; // Hide success message
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // Set the user's image_path with the selected image
      this.user.image_path = URL.createObjectURL(file);

      // Assuming user has a user_id property, adjust accordingly
      this.uploadUserImageService.uploadUserImage(file, this.user.user_id).subscribe(
        () => {
          // Display success message if needed
          this.displaySuccessMessage = true;
        },
        (error: any) => {
          console.error('Error uploading user image:', error);
          // Display error message if needed
          this.displayErrorMessage = true;
        }
      );
    }
  }


}

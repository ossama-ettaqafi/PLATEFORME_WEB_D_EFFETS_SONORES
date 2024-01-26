import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  public userId: number | undefined;
  public user: any;
  public allUsers: any[] = [];

  selectedFile: File | null = null;

  passwordMatchError: boolean = false;
  allFieldsFilled: boolean = true;
  displaySuccessMessage: boolean = false;
  displayErrorMessage: boolean = false;

  changesSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private sharedService: SharedService,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = this.sharedService.getLoggedInUserId() ?? undefined;

      this.userService.getUsers().subscribe((users) => {
        this.user = users.find((u) => u.id == this.userId);
      });
    });
  }

  checkPasswordMatch(): void {
    this.passwordMatchError = this.user.password !== this.user.repeatPassword;
  }

  saveChanges(form: NgForm): void {
    this.allFieldsFilled = Object.values(this.user).every(
      (value) => value !== ''
    );
    const passwordsFilledAndMatch =
      this.user.password &&
      this.user.repeatPassword &&
      this.user.password === this.user.repeatPassword;

    if (passwordsFilledAndMatch && this.allFieldsFilled) {

      if (this.selectedFile) {
        const newImagePath = `assets/users_images/${this.userId}_${this.selectedFile.name}`;

        // Simulate copying the file within the Angular app (for demonstration purposes)
        this.copyFileToLocalAssets(this.selectedFile, newImagePath);

        // Update user.image_path with the new path
        this.user.image_path = newImagePath;

        // Log the new image path for demonstration purposes
        console.log('New Image Path:', newImagePath);
      }


      console.log('Form submitted!', {
        ...form.value,
        image_path: this.user.image_path,
      });

      this.changesSaved = true;
      this.displaySuccessMessage = true;
      this.displayErrorMessage = false;
    } else {
      this.passwordMatchError = !passwordsFilledAndMatch;
      this.displayErrorMessage = true;
      this.displaySuccessMessage = false;
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.user.image_path = URL.createObjectURL(file);
    }
  }

  // Helper method to simulate copying the file within the Angular app
  private copyFileToLocalAssets(file: File, newPath: string): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;

      // Simulate copying the file to the new path
      this.http.post(newPath, dataUrl, { responseType: 'text' }).subscribe(
        (response) => {
          console.log('File copied successfully:', response);
        },
        (error) => {
          console.error('Error copying file:', error);
        }
      );
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
}

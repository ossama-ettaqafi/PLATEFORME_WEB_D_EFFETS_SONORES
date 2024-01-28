// settings-page.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';
import { Title } from '@angular/platform-browser';
import { UserUpdateService } from 'src/app/services/user-update.service';

export interface UserData {
  name: string;
  email: string;
  password: string;
  bio: string;
  country: string;
  city: string;
}

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  userId: number | undefined;
  user: any;
  selectedFile: File | null = null;
  registrationForm: FormGroup;

  passwordMatchError: boolean = false;
  allFieldsFilled: boolean = true;
  displaySuccessMessage: boolean = false;
  displayErrorMessage: boolean = false;
  displayUploadFailed: boolean = false;
  changesSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private sharedService: SharedService,
    private titleService: Title,
    private userUpdateService: UserUpdateService,
    private formBuilder: FormBuilder
  ) {
    this.setTitle('meow-it | Page des paramètres');
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: [''],
      city: [''],
      bio: [''],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = this.sharedService.getLoggedInUserId() ?? undefined;

      this.userService.getUsers().subscribe((users) => {
        this.user = users.find((u) => u.id == this.userId);

        // Set initial form values based on user data
        this.registrationForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          country: this.user.country,
          city: this.user.city,
          bio: this.user.bio,
          password: '', // Password fields can be initialized as needed
          repeatPassword: '',
        });
      });
    });
  }

  checkPasswordMatch(): void {
    this.passwordMatchError =
      this.registrationForm.get('password')?.value !==
      this.registrationForm.get('repeatPassword')?.value;
  }

  saveChanges(): void {
    this.checkPasswordMatch();
    this.allFieldsFilled = Object.values(this.registrationForm.value).every(
      (value) => value !== ''
    );

    if (this.registrationForm.valid && this.allFieldsFilled) {

      const userData: UserData = {
        name: this.registrationForm.get('name')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
        bio: this.registrationForm.get('bio')?.value,
        country: this.registrationForm.get('country')?.value,
        city: this.registrationForm.get('city')?.value,
      };


      // const formData = new FormData();
      // Append form data to the FormData object
      // formData.append('name', this.registrationForm.get('name')?.value);
      // formData.append('email', this.registrationForm.get('email')?.value);
      // formData.append('password', this.registrationForm.get('password')?.value);
      // formData.append('bio', this.registrationForm.get('bio')?.value);
      // formData.append('country', this.registrationForm.get('country')?.value);
      // formData.append('city', this.registrationForm.get('city')?.value);

      this.userUpdateService.updateUser(this.userId!, userData, this.selectedFile).subscribe(
        (response) => {
          // console.log('Update successful:', response);

          this.changesSaved = true;
          this.displaySuccessMessage = true;
          this.displayErrorMessage = false;
          this.displayUploadFailed = false;
        },
        (error) => {
          console.error('Update failed:', error);

          this.displayErrorMessage = false;
          this.displaySuccessMessage = false;
          this.displayUploadFailed = true;
        }
      );
    } else {
      this.displayErrorMessage = true;
      this.displaySuccessMessage = false;
      this.displayUploadFailed = false;
    }
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.user.image_path = URL.createObjectURL(this.selectedFile);
    }
  }
}

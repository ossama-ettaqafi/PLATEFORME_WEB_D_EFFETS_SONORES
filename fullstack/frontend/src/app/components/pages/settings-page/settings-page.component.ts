import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';
import { Title } from '@angular/platform-browser';
import { UserUpdateService } from 'src/app/services/user-update.service';

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
  displayUplaodFailed: boolean = false;

  changesSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private sharedService: SharedService,
    private titleService: Title,
    private userUpdateService: UserUpdateService
  ) {
    this.setTitle('meow-it | Page des paramètres');
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

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
    this.allFieldsFilled = Object.values(this.user).every(value => value !== '');
    const passwordsFilledAndMatch = this.user.password && this.user.repeatPassword && this.user.password === this.user.repeatPassword;

    if (passwordsFilledAndMatch && this.allFieldsFilled) {
      const formData = new FormData();

      // Append other form data to formData
      formData.append('name', this.user.name);
      formData.append('email', this.user.email);
      formData.append('country', this.user.country);
      formData.append('city', this.user.city);
      formData.append('bio', this.user.bio);
      formData.append('password', this.user.password);
      formData.append('repeatPassword', this.user.repeatPassword);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }else{
        formData.append('image', 'default');
      }

      // Use the userUpdateService to send the formData to the API
      this.userUpdateService.updateUser(formData).subscribe(
        (response) => {
          // Handle success response from the API
          console.log('Update successful:', response);

          this.changesSaved = true;
          this.displaySuccessMessage = true;
          this.displayErrorMessage = false;
          this.displayUplaodFailed = false;
        },
        (error) => {
          // Handle error response from the API
          console.error('Update failed:', error);

          this.displayErrorMessage = false;
          this.displaySuccessMessage = false;
          this.displayUplaodFailed = true;
        }
      );

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
}

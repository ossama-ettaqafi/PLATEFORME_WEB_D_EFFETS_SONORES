import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  users: any[] = [];
  errorMessage: string = '';
  loggedInUserId: number | null | undefined;

  constructor(private usersService: UsersService, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  onSubmit(form: NgForm) {
    const enteredEmail = form.value.email;
    const enteredPassword = form.value.password;

    // Reset error message
    this.errorMessage = '';

    // Basic email validation
    if (!enteredEmail || !enteredEmail.includes('@')) {
      this.errorMessage = 'Invalid email format';
      return;
    }

    // Find the user with the entered email
    const user = this.users.find(u => u.email === enteredEmail);

    if (user && user.password === enteredPassword) {
      // Authentication successful
      console.log('Login successful');

      // Set the logged user's ID in the SharedService
      this.sharedService.setLoggedInUserId(user.id);

      this.router.navigate(['/home']);
    } else {
      // Authentication failed
      this.errorMessage = 'Invalid credentials';
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(private authentication: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(2),
      'password': new FormControl()
    })
  }

  public async showUsername(): Promise<void> {
    this.authentication.username = this.signupForm.get('username').value;
    this.authentication.password = this.signupForm.get('password').value;

    let authenticated = await this.authentication.authenticate();

    if(authenticated) {
      this.router.navigate(['conversation']);
    }
  }
}

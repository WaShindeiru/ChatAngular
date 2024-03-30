import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public signupForm: FormGroup;
  public showErrorMessage: boolean = false;

  constructor(private authentication: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  public async login(): Promise<void> {
    this.authentication.username = this.signupForm.get('username').value;
    this.authentication.password = this.signupForm.get('password').value;

    let authenticated = await this.authentication.authenticate();

    if(authenticated) {
      this.showErrorMessage = false;
      this.router.navigate(['conversation']);
    } else {
      this.signupForm.setValue({
        username: "",
        password: ""
      });
      this.showErrorMessage = true;
    }
  }

  public goToRegistration() : void {
    this.router.navigate(["registration"]);
  }
}

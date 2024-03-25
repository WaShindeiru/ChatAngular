import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";
import {passwordMatchValidator} from "./Validators";
import {NgIf} from "@angular/common";
import {HttpService} from "../http/http.service";
import {ChatUser} from "../http/ChatUser";
import {ChatUserPassword} from "../http/ChatUserPassword";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public wrongUsernameError: boolean = false;
  public username: string;

  constructor(private authentication: AuthenticationService, private router: Router, private http: HttpService) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup( {
      "username": new FormControl(null, [Validators.required]),
      "password": new FormControl(null, [Validators.required]),
      "passwordAgain": new FormControl(null, [Validators.required])
    }, {
      updateOn: "blur",
      validators: [passwordMatchValidator()]
    })
  }

  public async registerUser() {
    this.username = this.registrationForm.get("username").value;
    const user : ChatUserPassword = {
      username: this.registrationForm.get("username").value,
      password: this.registrationForm.get("password").value
    }

    const result = await this.http.registerNewUser(user);

    if(result.status === 400) {
      this.wrongUsernameError = true;
    } else {
      this.wrongUsernameError = false;
    }
  }

  public goToLogin() {
    this.router.navigate(["login"]);
  }

}

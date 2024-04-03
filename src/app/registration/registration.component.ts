import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";
import {passwordMatchValidator} from "./Validators";
import {NgIf} from "@angular/common";
import {HttpService} from "../http/http.service";
import {ChatUser} from "../http/ChatUser";

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
  public showRegistrationMessage: boolean = false;

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
    const password: string = this.registrationForm.get("password").value;

    let response: ChatUser = await this.authentication.register(this.username, password);

    if(response === null) {
      this.wrongUsernameError = true;
      this.showRegistrationMessage = false;

    } else  {
      this.wrongUsernameError = false;
      this.showRegistrationMessage = true;
      this.router.navigate(["conversation"])

    }
  }

  public goToLogin() {
    this.router.navigate(["login"]);
  }

}

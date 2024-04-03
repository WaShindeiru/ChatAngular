import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {User} from "../authentication/User";
import {ChatUser} from "../http/ChatUser";

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
export class LoginComponent implements OnInit, OnDestroy {
  public signupForm: FormGroup;
  public showErrorMessage: boolean = false;
  private currentUserSubscription: Subscription;
  private currentUser: User;

  constructor(private authentication: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

    this.currentUserSubscription = this.authentication.currentUser.subscribe(value => this.currentUser = value);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  public async login(): Promise<void> {
    const username: string = this.signupForm.get('username').value;
    const password: string = this.signupForm.get('password').value;

    let result: ChatUser = await this.authentication.login(username, password);

    if(result !== null) {
      this.showErrorMessage = false;
      this.router.navigate(['conversation']);

    } else {
      this.signupForm.reset();
      this.showErrorMessage = true;
    }
  }

  public goToRegistration() : void {
    this.router.navigate(["registration"]);
  }
}

import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainTemplateComponent} from "./main-template/main-template.component";
import {AuthService} from "./auth/auth.service";
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ChattingFrontend';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainTemplateComponent} from "./main-template/main-template.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ChattingFrontend';
}

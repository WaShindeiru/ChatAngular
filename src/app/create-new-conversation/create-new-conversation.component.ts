import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";
import {HttpService} from "../http/http.service";

@Component({
  selector: 'app-create-new-conversation',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './create-new-conversation.component.html',
  styleUrl: './create-new-conversation.component.css'
})
export class CreateNewConversationComponent {

  public conversationForm: FormGroup;
  public message: string = "sigma";
  public showMessage: boolean = false;

  constructor(private authentication: AuthenticationService, private router: Router, private http: HttpService) {}

  ngOnInit(): void {
    this.conversationForm = new FormGroup({
      "conversationName": new FormControl(null, [Validators.required])
    });
  }

  public async createNewConversation() {
    let conversationName = this.conversationForm.get("conversationName").value;

    let response = await this.http.createNewConversation({
      conversationName: conversationName
    });

    if(response.status === 200) {
      this.message = "Conversation added successfully";
      this.showMessage = true;
    } else if(response.status === 404) {
      this.message = "Conversation with name: " + conversationName + " already exists";
      this.showMessage = true;
    }
  }

  public goToMainView() {
    this.router.navigate(["conversation"]);
  }
}

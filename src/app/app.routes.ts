import { Routes } from '@angular/router';
import {ConversationRouteComponent} from "./conversation-route/conversation-route.component";
import {LoginComponent} from "./login/login.component";
import {MainTemplateComponent} from "./main-template/main-template.component";
import {RegistrationComponent} from "./registration/registration.component";

export const routes: Routes = [
  {
    path: "conversation",
    component: MainTemplateComponent,
    children:
      [
        {
          path: ":id",
          component: ConversationRouteComponent
        }
      ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registration",
    component: RegistrationComponent
  },
  {
    path: "**",
    redirectTo: "conversation"
  }
];

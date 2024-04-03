import { Routes } from '@angular/router';
import {ConversationRouteComponent} from "./conversation-route/conversation-route.component";
import {LoginComponent} from "./login/login.component";
import {MainTemplateComponent} from "./main-template/main-template.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CreateNewConversationComponent} from "./create-new-conversation/create-new-conversation.component";
import {unauthenticatedGuard} from "./authentication/AuthGuard";

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
      ],
    canActivate: [unauthenticatedGuard]
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
    path: "create",
    component: CreateNewConversationComponent,
    canActivate: [unauthenticatedGuard]
  },
  {
    path: "**",
    redirectTo: "conversation"
  }
];

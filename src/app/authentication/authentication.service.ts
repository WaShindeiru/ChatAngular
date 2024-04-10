import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChatUser, ChatUserPassword} from "../http/ChatUser";
import {BehaviorSubject} from "rxjs";
import {AuthenticationResponse, User} from "./User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenExpirationTimer: any;
  public currentUser = new BehaviorSubject<User>(null);
  private expirationDuration: number = 5 * 60;

  constructor(private router: Router) { }

  public async login(username: string, password: string) : Promise<ChatUser> {
    const url : string = "http://localhost:8080/login";

    let response = await fetch(url,  {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "Authorization": "Basic " + btoa(username + ":" + password)
      }
    });


    if(response.ok) {
      const authenticatedUser: AuthenticationResponse = await response.json();
      this.authenticateUser(authenticatedUser.id, authenticatedUser.username, authenticatedUser.token);

      return {
        id: authenticatedUser.id,
        username: authenticatedUser.username,
        status: authenticatedUser.status
      };
    }

    else {
      return null;
    }
  }

  public async register(username: string, password: string) : Promise<ChatUser> {
    const url : string = "http://localhost:8080/login";

    const requestUser: ChatUserPassword = {
      username: username,
      password: password
    }

    let response = await fetch(url,  {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(requestUser)
    });

    if (response.ok) {
      return this.login(username, password);
    } else {
      return null;
    }
  }

  private authenticateUser(userId: string, email: string, token: string) {
    const user = new User(userId, email, token);
    this.currentUser.next(user);
    this.autoLogout();
    localStorage.setItem("UserData", JSON.stringify(user));
  }

  public autoLogin() {
    const userData : AuthenticationResponse = JSON.parse(localStorage.getItem("UserData"));
    console.log(userData);
    if (userData === null) {
      return;
    }

    const loadedUser = new User(userData.id, userData.username, userData.token);
    this.currentUser.next(loadedUser);
  }

  public autoLogout() {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, this.expirationDuration * 1000);
  }

  public logout() {
    this.currentUser.next(null);
    this.router.navigate(["/login"]);
    localStorage.removeItem("UserData");

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}

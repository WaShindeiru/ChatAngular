import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../authentication/User";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) { }

  private authenticateUser(userId: string, email: string, token: string) {
    const user = new User(userId, email, token);
    this.currentUser.next(user);
  }
}

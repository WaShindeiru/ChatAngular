import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationResponse} from "./AuthenticationResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userId: string = null;
  private _authenticated: boolean = false;
  private _token: string = "";

  public username: string = null;
  public password: string = null;

  constructor(private http: HttpClient) {}

  private async authenticate_() : Promise<boolean> {
    const url : string = "http://localhost:8080/login";
    const tempHeaders = {
      "Authorization": "Basic " + btoa(this.username + ":" + this.password)
    }

    let response = await fetch(url, {
      method: "POST",
      headers: tempHeaders
    })

    if(response.ok) {
      this._token = "";
      let stream = await response.body.getReader().read();
      for (const i of stream.value) {
        this._token += String.fromCharCode(i);
      }

      this._authenticated = true;
      return true;
    }

    else {
      return false;
    }
  }

  public async authenticate() : Promise<boolean> {
    if(this._authenticated) {
      return true;
    }

    else {
      return this.authenticate_();
    }
  }

  public get authenticated() : boolean {
    return this._authenticated
  }

  public get token() : string {
    return this._token;
  }

  public get userId() : string {
    return this._userId;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //generate Token
  public generateToken(loginData: any) {
    return this.http.post(`${baseURL}/generate-token/`, loginData);
  }

   //get current user
   public getCurrentUser(){
    return this.http.get(`${baseURL}/current-user`);
   }

  //loginUser method store an authentication_token in local storage
  public loginUser(token: any) {
    localStorage.setItem("token", token);
    return true;
  }

  //Check the user is loggged in or not
  public isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //logoutUser method Remove an authentication_token from local storage
  public logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }

  //getToken
  public getToken() {
    return localStorage.getItem("token");
  }

  //set User Details
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  }

  //get User Details
  public getUser() {
    let userData = localStorage.getItem("user");
    if (userData != null) {
      return JSON.parse(userData);
    } else {
      this.logoutUser();
      return null;
    }
  }

  //get User Role
  public getUserRole() {
    let user = this.getUser();
    if (user != null) {
      return user.authorities[0].authority;
    }
  }

 

}

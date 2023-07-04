import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  public addUser(user:any){
    return this.http.post('http://localhost:8080/user/',user);
  }

  public updateUser(user:any){
    console.log(user);
    return this.http.put('http://localhost:8080/user/',user);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient) { }

  //load all categories from server
  public categories() {
    return this.http.get(`${baseURL}/category/`);
  }

  //add category
  public addCategory(category:any){
    return this.http.post(`${baseURL}/category/`,category);  
  }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(private http:HttpClient) { }

  //get all quizzes
  public getQuizzes(){
    return this.http.get(`${baseURL}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz:any){
    return this.http.post(`${baseURL}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(quizid:any){
    return this.http.delete(`${baseURL}/quiz/${quizid}`);
  }

  //get Quiz by id
  public getQuiz(qId:any){
    return this.http.get(`${baseURL}/quiz/${qId}`);
  }

  //update Quiz
  public updateQuiz(quiz:any){
    return this.http.put(`${baseURL}/quiz/`,quiz);
  }

  //get Quizzes by category
  public getQuizByCat_(cat_id:any){
    return this.http.get(`${baseURL}/quiz/category/${cat_id}`);
  }
  
  //get Active Quizzes
  public getActiveQuizzes(){
    return this.http.get(`${baseURL}/quiz/active/`);
  }

  //get Active Quizzes by Category
  public getActiveQuizzesByCategory(cat_id:any){
    return this.http.get(`${baseURL}/quiz/category/active/${cat_id}/`);
  }
   //get Active Quizzes by Quiz_id
   public getActiveQuizzesById(quiz_id:any){
    return this.http.get(`${baseURL}/quiz/active/${quiz_id}/`);
  }
}

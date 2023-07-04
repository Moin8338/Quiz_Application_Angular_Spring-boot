import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http:HttpClient) { }

  //get All Question by Quiz
  public getQuestionOfQuiz(qId:any){
      return this.http.get(`${baseURL}/question/quiz/all/${qId}`);
  }

  //get All Question by Quiz
  public getQuestionOfForTest(qId:any){
    return this.http.get(`${baseURL}/question/quiz/${qId}`);
}

  //add Question
  public addQuestion(question:any){
    return this.http.post(`${baseURL}/question/`,question);
  }

  // update Question
  public updateQuestion(updatedQuestion:any){
    return this.http.put(`${baseURL}/question/`,updatedQuestion);
  }

  //get One Question By Id
  public getQuestionById(Question_id:any){
    return this.http.get(`${baseURL}/question/${Question_id}`);
  }

  //delete Question
  public deleteQuestion(Question_id:any){
    return this.http.delete(`${baseURL}/question/${Question_id}`);
  }

  //evaulate the question (check a quiz after attempting a quiz)
  public evalQuiz(questionList:any){
    return this.http.post(`${baseURL}/question/eval-quiz/`,questionList);
  }
}

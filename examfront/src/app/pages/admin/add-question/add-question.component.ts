import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor: any = ClassicEditor;

  element!: HTMLElement;
  question = {
    content: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    quiz: {
      id: "",
      title: "",
    }
  }
  quizzes: any;
  constructor(private questionService: QuestionServiceService, private _router: ActivatedRoute, private quizService: QuizServiceService, private snack: MatSnackBar) { }
  ngOnInit(): void {
    this.question.quiz.id = this._router.snapshot.params['qId'];
    this.question.quiz.title = this._router.snapshot.params['title'];
    this.quizService.getQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        this.snack.open("INTERNAL SERVER ERROR", "", {
          duration: 3000
        });
        return;
      }
    );
  }

  formSubmit() {
    if (this.question.content == null || this.question.content == "" || this.question.option1 == null || this.question.option1 == "" || this.question.option2 == null ||
      this.question.option2 == null) {
      this.snack.open("All Field Required !!", "", {
        duration: 3000
      });
      return;
    }
    this.questionService.addQuestion(this.question).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire("Good job!", " Question is Added", "success").then((result: any) => {
          this.element = document.getElementById('Clear') as HTMLElement;
          this.element.click();
        });
      },
      (error) => {
        console.log(error);
        this.snack.open("Some Error is occurred ! please Add Question Again", "", {
          duration: 3000
        });
      }
    );
  }
}

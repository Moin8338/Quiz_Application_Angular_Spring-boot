import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(private locationSt: LocationStrategy, private quiestionService: QuestionServiceService, private quizService: QuizServiceService, private _router: ActivatedRoute, private _snack: MatSnackBar) { }
  quiz_id: any;
  quiz: any;
  question: any;
  filtered_Question: any;
  correctAnswer = 0;
  Gotmarks = 0;
  AttemptedQuestion = 0;
  filter_name = "all";
  timer: any;
  forceSubmit = false;
  submitted = false;
  ngOnInit(): void {
    this.preventBackButton();
    this.quiz_id = this._router.snapshot.params["q_id"];
    this.quizService.getActiveQuizzesById(this.quiz_id).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        this._snack.open("INTERNAL SERVER ERROR", "", {
          duration: 3000
        });
      }
    );
    this.loadQuestion();
    this.startTimer();
  }


  //load question
  loadQuestion() {
    this.quiestionService.getQuestionOfForTest(this.quiz_id).subscribe(
      (data: any) => {
        this.question = data;
        this.timer = this.question.length * 2 * 60;
        console.log(data);
        this.question.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
      },
      (error) => {
        console.log(error);
        this._snack.open("INTERNAL SERVER ERROR", "", {
          duration: 3000
        });
      }
    );
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, "", location.href);
    });
  }


  //submit Quiz
  SubmitQuiz() {
    this.filtered_Question = this.question;
    if (this.forceSubmit) {
      this.question.forEach((q: any) => {
        if (q.givenAnswer == q.answer) {
          this.correctAnswer++;
          let marksSingle = this.question[0].quiz.maMarks / this.question.length;
          this.Gotmarks += marksSingle;
        }
      });
      this.submitted = true;
      Swal.fire("success", "you Successfully submited.");
    }
    else {
      Swal.fire({
        icon: 'info',
        title: 'Do yo Want to submit the Quiz ? ',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonText: 'No',
      })
        .then((result: any) => {
          if (result.isConfirmed) {
            this.timer = 0;
            this.submitted = true;
            this.question.forEach((q: any) => {
              if (q.givenAnswer == q.answer) {
                this.correctAnswer++;
                let marksSingle = this.question[0].quiz.maMarks / this.question.length;
                this.Gotmarks += marksSingle;
              }
              
            });
            Swal.fire("success", "you Successfully submited.", 'success');
          }
        });
    }
  }


  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0 && !this.submitted) {
        this.forceSubmit = true;
        this.SubmitQuiz();
        clearInterval(t);
      }
      else {
        this.forceSubmit = false;
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} minute : ${ss} Seconds`
  }


  //filter Question (after submiting)
  filterResult() {
    // console.log("change");
    if (this.filter_name == 'right') {
      this.filtered_Question = this.question.filter((que: any) => que.answer == que.givenAnswer);
    }
    else if (this.filter_name == 'attempted') {
      // console.log("change");
      this.filtered_Question = this.question.filter((que: any) => que.givenAnswer != null || que.givenAnswer != "");
    }
    else if (this.filter_name == 'not_attempted') {
      this.filtered_Question = this.question.filter((que: any) => que.givenAnswer == null || que.givenAnswer == "");
    }
    else if (this.filter_name == 'wrong') {
      this.filtered_Question = this.question.filter((que: any) => que.answer != que.givenAnswer);
    }
    else {
      this.filtered_Question=this.question;
    }

  }


  printQuiz(){
    window.print();
  }
}

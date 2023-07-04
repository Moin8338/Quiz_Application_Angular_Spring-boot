import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qId: any;
  title: any;
  questions: any;
  constructor(private _router: ActivatedRoute, private questionService: QuestionServiceService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._router.snapshot.params['qId'];
    this.title = this._router.snapshot.params['title'];
    this.questionService.getQuestionOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(this.questions);

      },
      (error) => {
        console.error(error);
      }
    );
  }


  deleteQuestion(queId: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you Sure ?',
      confirmButtonText: 'Yes',
      showCancelButton: true
    })
      .then((result: any) => {
        if (result.isConfirmed) {
          this.questionService.deleteQuestion(queId).subscribe(
            (data: any) => {
              this.questions = this.questions.filter((q: any) => q.quesId != queId);
              this.snack.open("Delete Successfully", " ", {
                duration: 3000
              });
            },
            (error) => {
              console.log(error);
              this.snack.open("Somthing Went Wrong !! ", " ", {
                duration: 3000
              });
              return;
            }
          );
          Swal.fire("Good job!", "Your Question is has been deleted", "success");

        } else {
          Swal.fire("Good Job !", "Your Quiz is Safe", "success");
        }
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instruction',
  templateUrl: './quiz-instruction.component.html',
  styleUrls: ['./quiz-instruction.component.css']
})
export class QuizInstructionComponent implements OnInit {

  quiz: any;
  q_id: any;
  checked = false;
  constructor(private _router: ActivatedRoute, private quizService: QuizServiceService, private router: Router, private _snack: MatSnackBar) { }
  ngOnInit(): void {
    this._router.params.subscribe(
      (param: any) => {
        this.q_id = param["q_id"];
        if (this.q_id == null || this.q_id == "") {
          this.router.navigate(["/404"]);
          return;
        }
        this.quizService.getActiveQuizzesById(this.q_id).subscribe(
          (data: any) => {
            this.quiz = data;
            console.log(data);
          },
          (error) => {
            this._snack.open("Somthing Went Wrong !! ", " ", {
              duration: 3000
            });
          }
        );
      }
    );
  }



  startQuiz() {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to start the Quiz ? ',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'No',
    })
      .then((result: any) => {
        if (result.isConfirmed) {

          this.router.navigate(['/start-quiz/' + this.quiz[0].id]);
        }
      });
  }

}

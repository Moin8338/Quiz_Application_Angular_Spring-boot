import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  question: any;

  public Editor: any = ClassicEditor;

  constructor(private questionService: QuestionServiceService, private _router: ActivatedRoute, private snack: MatSnackBar,private router:Router) { }
  ngOnInit(): void {
    this.questionService.getQuestionById(this._router.snapshot.params['queId']).subscribe(
      (data: any) => {
        this.question = data;
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

    this.questionService.updateQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire("Good job!", " Question is Updated", "success").then((result: any) => {
          this.router.navigate(['/admin/view-questions/'+this.question.quiz.id+'/'+this.question.quiz.title]);
        });
      },
      (error) => {
        this.snack.open("Somthing Went Wrong", "", {
          duration: 3000
        });
      }
    );
  }
}

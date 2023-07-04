import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  quiz: any;

  categories = [{
    id: "",
    title: "",
    description: ""
  }]
  constructor(private categoryService: CategoryServiceService, private quizService: QuizServiceService, private snack: MatSnackBar, private _router: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.quizService.getQuiz(this._router.snapshot.params['qId']).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        alert("Error is Occur....." + error);
      }
    );
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error.message);
        this.snack.open("Somthing Went Wrong !! ", " ", {
          duration: 3000
        });
      }
    );
  }

  formSubmit() {
    if (this.quiz.title == null || this.quiz.title == "" || this.quiz.description == null || this.quiz.description == "" || this.quiz.category == null) {
      this.snack.open("All Field Required !!", "", {
        duration: 3000
      });
      return;
    }
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        // console.log(data);
        Swal.fire("Good job!", data.title + " Quiz is Updated", "success").then(
          ((result:any) =>{
            this.router.navigate(['/admin/view-quizzes']);
          })
        );
        
      },
      (error) => {
        // console.log(error);
        this.snack.open("Some Error is occurred ! please update Quiz Again", "", {
          duration: 3000
        });
      }
    );
  }
}

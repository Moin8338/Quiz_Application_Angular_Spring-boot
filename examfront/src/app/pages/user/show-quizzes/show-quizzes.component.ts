import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizzes',
  templateUrl: './show-quizzes.component.html',
  styleUrls: ['./show-quizzes.component.css']
})
export class ShowQuizzesComponent {
  constructor(private quizService: QuizServiceService, private categoryServie: CategoryServiceService, private snack: MatSnackBar, private _router: ActivatedRoute) { }
  cat_id: any;
  cat_title: any;
  quiz!: Array<any>;
  categories: any;
  filtered_quiz: any;
  filterName: any;

  ngOnInit(): void {
    this.categoryServie.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this._router.params.subscribe(
      (params: any) => {
        this.cat_id = params["cId"];
        this.cat_title = params["title"];
        // load all quiz 
        if (this.cat_id == 0 || this.cat_id == null) {
          this.quizService.getActiveQuizzes().subscribe(
            (data: any) => {
              console.log(data);
              this.quiz = data;
              this.filtered_quiz = data;
            },
            (error) => {
              console.log(error.message);
              this.snack.open("Somthing Went Wrong !! ", " ", {
                duration: 3000
              });
            }
          );
          // load quiz by category
        } else {
          this.quizService.getActiveQuizzesByCategory(this.cat_id).subscribe(
            (data: any) => {
              console.log(data);
              this.quiz = data;
              this.filtered_quiz = data;
            },
            (error) => {
              console.log(error);
              if (error.status == 500) {
                this.snack.open("No Data Found !! ", " ", {
                  duration: 3000
                });
              }
              else {
                console.log(error.message);
                this.snack.open("Somthing Went Wrong !! ", " ", {
                  duration: 3000
                });
              }
            }
          );
        }
      }
    );

  }


  filterQuiz() {
    if (this.filterName == null || this.filterName == "") {
      this.filtered_quiz=this.quiz;
    } else {
      this.filtered_quiz = this.quiz.filter((q: any) => q.title.toLowerCase().includes(this.filterName.toLowerCase()));
      console.log(this.filterName);
    }
  }



}

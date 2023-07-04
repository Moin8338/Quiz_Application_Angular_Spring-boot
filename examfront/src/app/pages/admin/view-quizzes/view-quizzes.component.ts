import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private quizService: QuizServiceService, private categoryServie: CategoryServiceService, private snack: MatSnackBar, private _router: ActivatedRoute) { }
  quiz = [{
    id: " ",
    title: " ",
    description: " ",
    maMarks: "",
    numberOfQuestion: "",
    active: "",
    category: {
      description: "",
      id: "",
      title: ""
    }

  }]

  filtered_quiz: any;
  cId: any;
  cTitle: any;
  filterName: any;
  categories: any;

  ngOnInit(): void {

    //get category for filter a quiz
    this.categoryServie.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );

    //get parameter from url (get category id and category title)
    this._router.params.subscribe(
      (params: any) => {
        this.cId = params["cId"];
        this.cTitle = params["title"];

        //if no category is specify in url or specify category id 0
        if (this.cId == null || this.cId == 0 || this.cTitle == null || this.cTitle == '') {

          //show all quiz
          this.quizService.getQuizzes().subscribe(
            (data: any) => {
              // console.log(data);
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

        }

        //if category id is specified in url then we show a quiz by category
        else {

          //get activeted quiz by category
          this.quizService.getActiveQuizzesByCategory(this.cId).subscribe(
            (data: any) => {
              this.quiz = data;
              this.filtered_quiz = data;
            },
            (error) => {
              this.snack.open("INTERNAL SERVER ERROR", "", {
                duration: 3000
              });
            }
          );

        }


      },
      (error) => {
        this.snack.open("INTERNAL SERVER ERROR", "", {
          duration: 3000
        });
      }
    );

  }

  //filter quiz by category
  filterQuiz() {
    if (this.filterName == null || this.filterName == "") {
      this.filtered_quiz = this.quiz;
    } else {
      this.filtered_quiz = this.quiz.filter((q: any) => q.title.toLowerCase().includes(this.filterName.toLowerCase()));
      console.log(this.filterName);
    }
  }


  deleteQuiz(quizId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Yes',
      showCancelButton: true
    })
      .then((result: any) => {
        if (result.isConfirmed) {
          this.quizService.deleteQuiz(quizId).subscribe(
            (data: any) => {
              this.quiz = this.quiz.filter((q: any) => q.id != quizId);
              this.snack.open("Delete Successfully", " ", {
                duration: 3000
              });
            },
            (error) => {
              console.log(error);
              this.snack.open("Somthing Went Wrong !! ", " ", {
                duration: 3000
              });
            }
          );
          Swal.fire("Good job!", "Your Quiz is has been deleted", "success");

        } else {
          Swal.fire("Good Job !", "Your Quiz is Safe", "success");
        }
      });
  }
}




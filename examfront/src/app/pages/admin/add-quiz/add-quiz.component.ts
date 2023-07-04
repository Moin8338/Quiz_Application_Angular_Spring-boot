import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  quiz = {
    title: "",
    description: "",
    maMarks:"",
    numberOfQuestion:"",
    active:true,
    category: {
      id: "",
      title: "",
      description: ""
    }
  }
  categories = [{
    id: "",
    title: "",
    description: ""
  }]
  constructor(private categoryService: CategoryServiceService,private quizService:QuizServiceService, private snack: MatSnackBar) { }
  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories=data;
    },
    (error)=>{
      console.log(error.message);
      this.snack.open("Somthing Went Wrong !! "," ",{
        duration:3000
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
    this.quizService.addQuiz(this.quiz).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire("Good job!", data.title + " Quiz is Added", "success");
      },
      (error) => {
        this.snack.open("Some Error is occurred ! please Add Quiz Again", "", {
          duration: 3000
        });
      }
    );
  }
}

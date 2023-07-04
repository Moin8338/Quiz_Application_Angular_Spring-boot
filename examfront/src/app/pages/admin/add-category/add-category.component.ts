import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoryServiceService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category = {
    title: "",
    description: ""
  }
  constructor(private categoryService: CategoryServiceService,private snack:MatSnackBar) { }


  formSubmit() {
    if (this.category.title == null || this.category.title == "" || this.category.description == null || this.category.description == "") {
      this.snack.open("All Field Required !!","",{
        duration:3000
      });
      return;
    } 
    this.categoryService.addCategory(this.category).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire("Good job!", data.title + " category is Added", "success");
      },
      (error)=>{
        this.snack.open("Some Error is occurred ! please Add Category Again","",{
          duration:3000
        });
      }
    );
  }

}

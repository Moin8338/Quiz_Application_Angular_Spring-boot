import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryServiceService,private snack:MatSnackBar) { }
  categories=[{
    id:" ",
    title:" ",
    description:" "
  }]

  filterName:any;
  filtered_categories:any;

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories=data;
        this.filtered_categories=data;
    },
    (error)=>{
      console.log(error.message);
      this.snack.open("Somthing Went Wrong !! "," ",{
        duration:3000
      });
    }
    );
  }


  //filter categories
  filterCategories(){
    if (this.filterName == null || this.filterName == "") {
      this.filtered_categories=this.categories;
    } else {
      this.filtered_categories = this.categories.filter((cat: any) => cat.title.toLowerCase().includes(this.filterName.toLowerCase()));
      console.log(this.filterName);
    }
  }

}

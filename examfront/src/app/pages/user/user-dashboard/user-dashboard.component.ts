import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  
  categories:any;
  user_details:any;

  constructor(private categoryService:CategoryServiceService,private loginService:LoginService,private _snack:MatSnackBar){ }
  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        this._snack.open("INTERNAL SERVER ERROR","",{
          duration:3000
        });
      }
    );
    this.loginService.getCurrentUser().subscribe(
      (data:any)=>{
        console.log(data);
        this.user_details=data;
      },
      (error)=>{
        this._snack.open("INTERNAL SERVER ERROR","",{
          duration:3000
        });
      }
    );
  }
}

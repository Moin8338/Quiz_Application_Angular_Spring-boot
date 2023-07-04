import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit{
  loginData = {
    username: '',
    password: '',
  }

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }


  ngOnInit(): void {
        if(this.login.isLoggedIn()){
            //redirect to ADMIN-Dashboard---------------
            if (this.login.getUserRole() == "ADMIN") {
              this.router.navigate(['admin']);
            }
            //redirect to NORMAL-Dashboard---------------
            else if (this.login.getUserRole() == "NORMAL") {
              this.router.navigate(['user-dashboard']);

            }
        }
  }

  
  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open("Username is Required", "", {
        duration: 3000
      });
      return;
    } else if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open("Password is Required", "", {
        duration: 3000
      });
      return;
    }

    //request to server to generate Token to Access an api

    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("success");
        //token store in localStorage
        this.login.loginUser(data.token);

        //get currentUser Details
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);

            //redirect to ADMIN-Dashboard---------------
            if (this.login.getUserRole() == "ADMIN") {
              console.log("admin");
              window.location.href='admin';
            }
            //redirect to NORMAL-Dashboard---------------
            else if (this.login.getUserRole() == "NORMAL") {
              window.location.href='user-dashboard';

            }
            //if no Role specified
            else {
              console.log("Role is not specified");
              this.login.logoutUser();
              // location.reload();
              this.router.navigate(["signin"]);
            }

          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        if (error.status == 500) {
          this.snack.open("In-Valid Cradential", "", {
            duration: 3000
          });
        }
        else{
          this.snack.open("INTERNAL SERVER ERROR", "", {
            duration: 3000
          });
        }
      }
    );

  }

 
  

}


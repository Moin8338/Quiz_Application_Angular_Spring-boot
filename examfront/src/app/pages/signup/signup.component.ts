import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
// import { NgxUiLoaderService } from 'ngx-ui-loader/public-api';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
// import { User } from 'src/app/model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  element!:HTMLElement;

  map = new Map()
    .set("username", "User name must be Unique !!")
    .set("phone", "")
    .set("password", "");
  submitted = true;
  passwordVisibility = false;

  constructor(private _snackBar: MatSnackBar, private userservie: UserService) { }//private ngxService:NgxUiLoaderService

  // pattern form inputs
  username_p = new RegExp("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
  password_p = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  email_p = new RegExp("^(.+)@(.+)$");

  public user = {
    username: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
  };

  passwordVisibilityToggle() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  u_validation() {
    if (!this.username_p.test(this.user.username)) {
      this.submitted = true;
      this.map.set("username", "Enter valid username");
    }
    else {
      this.submitted = false;
      this.map.set("username", " ");
    }
  }
  pass_validation() {
    if (!this.password_p.test(this.user.password) && this.user.password != "") {
      this.submitted = true;
      this.map.set("password", "Enter Strong password");
    }
    else {
      this.submitted = false;
      this.map.set("password", " ");
    }
  }
  phone_validation() {
    if (this.user.phone.toString().length != 10) {
      this.submitted = true;
      this.map.set("phone", "please Enter valid Phone Number");
    }
    else {
      this.submitted = false;
      this.map.set("phone", " ");

    }
  }
  email_validation() {
    if (!this.email_p.test(this.user.email)) {
      this.submitted = true;
      this.map.set("email", "please Enter valid Email");
    }
    else {
      this.submitted = false;
      this.map.set("email", " ");

    }
  }

  // form Validation
  ngOnInit() {
    // this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // // Stop the foreground loading after 5s
    // setTimeout(() => {
    //   this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    // }, 5000);

    // // OR
    // this.ngxService.startBackground("do-background-things");
    // // Do something here...
    // this.ngxService.stopBackground("do-background-things");

    // this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // // Stop the foreground loading after 5s
    // setTimeout(() => {
    //   this.ngxService.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    // }, 5000);
  }


  formSubmit() {
    if (this.user.username == "" || this.user.username == null ||
      this.user.firstname == "" || this.user.firstname == null ||
      this.user.lastname == "" || this.user.lastname == null ||
      this.user.email == "" || this.user.email == null ||
      this.user.phone.toString() == "" || this.user.phone == null ||
      this.user.password == "" || this.user.password == null) {

      this.submitted = false;
      this._snackBar.open("All field Required !!", '', {
        duration: 3000,
      });
      return;
    }
    this.userservie.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire("Good job!", data.firstname + " you are registered", "success");
        // this.user.username = "";
        // this.user.firstname = "";
        // this.user.lastname = "";
        // this.user.email = "";
        // this.user.password = "";
        // this.user.phone = "";
        this.element = document.getElementById('Clear') as HTMLElement;
        this.element.click();
      },
      (error) => {
        if (error.status == 403) {
          this.map.set("username", "username allready in use");
          this._snackBar.open("user already there please Enter a diffrent Username", '', {
            duration: 3000
          });
        } else {
          this._snackBar.open("somthing went wrong", '', {
            duration: 3000
          });
        }
      }

    );

  }
}

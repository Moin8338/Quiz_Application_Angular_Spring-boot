import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  panelOpenState = true;
  update_panelOpenState = false;
  user = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email:'',
    password:'',
    phone: ''
  }
  userRole = this.login.getUserRole();


  constructor(private login: LoginService, private _snackBar: MatSnackBar, private userservie: UserService) { }

  ngOnInit() {
    this.login.getCurrentUser().subscribe(
      (data:any)=>{
        this.user.id=data.id;
        this.user.username=data.username;
        this.user.firstname=data.firstname;
        this.user.lastname=data.lastname;
        this.user.email=data.email;
        this.user.password=data.password;
        this.user.phone=data.phone;
      }
    );
    this.userRole = this.login.getUserRole();
  }




  //edit profile section

  element!: HTMLElement;

  map = new Map()
    .set("username", "User name must be Unique !!")
    .set("phone", "")
    .set("password", "");
  submitted = true;
  // passwordVisibility = false;

  // pattern form inputs
  username_p = new RegExp("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
  // password_p = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  email_p = new RegExp("^(.+)@(.+)$");



  // passwordVisibilityToggle() {
  //   this.passwordVisibility = !this.passwordVisibility;
  // }

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
  // pass_validation() {
  //   if (!this.password_p.test(this.user.password) && this.user.password != "") {
  //     this.submitted = true;
  //     this.map.set("password", "Enter Strong password");
  //   }
  //   else {
  //     this.submitted = false;
  //     this.map.set("password", " ");
  //   }
  // }
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




  formSubmit() {
    if (this.user.username == "" || this.user.username == null ||
      this.user.firstname == "" || this.user.firstname == null ||
      this.user.lastname == "" || this.user.lastname == null ||
      this.user.email == "" || this.user.email == null ||
      this.user.phone.toString() == "" || this.user.phone == null) {

      this.submitted = false;
      this._snackBar.open("All field Required !!", '', {
        duration: 3000,
      });
      return;
    }
    console.log(this.user);
    this.userservie.updateUser(this.user).subscribe(
      (data:any)=>{
        this.user=data;
        // this.login.setUser(data);
        this._snackBar.open("User is updated !!", '', {
          duration: 3000,
        });
      },
      (error)=>{
        console.log(error);
        this._snackBar.open("Somthing Went Wrong !!", '', {
          duration: 3000,
        });
      }
    )
  }



  
}

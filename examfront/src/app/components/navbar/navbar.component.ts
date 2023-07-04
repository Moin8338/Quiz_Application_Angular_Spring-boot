import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn = false;
  user = this.login.getUser();

  constructor(public login: LoginService) { }
  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
  }

  logout() {
    this.login.logoutUser();
    this.isLoggedIn=false;
    this.user=null;
    window.location.reload();
  }

}

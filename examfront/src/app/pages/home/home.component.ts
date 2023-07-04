import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user = this.login.getUser();

  constructor(public login: LoginService) { }
  ngOnInit(): void {
    this.user=this.login.getUser();
  }

  logout() {
    this.login.logoutUser();
    this.user=null;
    window.location.reload();
  }
}

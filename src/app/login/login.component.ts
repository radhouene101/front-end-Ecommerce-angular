import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthentificationService ,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(user) {
    this.authService.login(user.username, user.password);
    if (this.authService.isAuthenticated()){
      this.router.navigateByUrl('');
      this.authService.saveAuthenticatedUser();

    }
    else {
      alert("Please write valid login and password")
    }
  }


}

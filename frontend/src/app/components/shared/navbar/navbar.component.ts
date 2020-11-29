import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService : AuthService, private router :Router) { }

  ngOnInit(): void {
  }


  isAuthenticated() {
    return this._authService.isAuthenticated()
  }

  logOut() {
    this._authService.logout()
    this.router.navigateByUrl('home')
  }

  logIn() {
   
    this.router.navigateByUrl('login')
  }

  signUp() {
    
    this.router.navigateByUrl('signup')
  }
}

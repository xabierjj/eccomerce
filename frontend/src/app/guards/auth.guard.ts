import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (private auth: AuthService , private router: Router)  {

  }
  
  canActivate(): boolean  {
    console.log(this.auth.isAuthenticated())
   


     if (this.auth.isAuthenticated()) {
       return true;
     } else {
      this.router.navigateByUrl('login')
      return false
     }
  }
  
}

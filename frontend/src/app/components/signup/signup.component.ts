import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {UserSignModel} from '../../models/user.models'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  user:UserSignModel
  constructor( private auth: AuthService, private router : Router) {
    this.user = new UserSignModel()
   }

  ngOnInit(): void {
  }


  onSubmit(form:NgForm) {

    if (form.invalid) {
      return
    }
    console.log(this.user)
    this.auth.signup(this.user).subscribe((res)=> {
      if (res.errors) {
        console.log(res.errors)
      } else {
        this.router.navigateByUrl('admin/products')
      }
    })

    

  }

}

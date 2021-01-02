import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.models'
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user: UserModel
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = new UserModel()



  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return
    }
    console.log(this.user)
    this.auth.login(this.user).subscribe((res) => {
      if (res.errors) {
        console.log(res.errors)
      } else {


        this.router.navigateByUrl('admin/products')
      }
    })

    // console.log(this.user)
    // console.log(form)
    // console.log(form.controls.email.valid)

  }

}

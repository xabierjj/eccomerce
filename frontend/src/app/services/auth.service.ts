import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel,UserSignModel } from '../models/user.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string='http://localhost:3000'
  private token:string=''
  constructor(private http: HttpClient) {
    
   }

   isAuthenticated() :boolean {
    const token = this.getToken()
    if (token) {
      return token.length>2
    } else {
      return false
    }
   }

   login(user: UserModel) {
      return this.http.post(`${this.url}/login`,user  ).pipe(tap(
        (res: any) => {
          if (res) {
            console.log(res.accessToken)
            // guardar token
            this.saveToken(res.accessToken);
          }
        })
      );

   }

   signup(user:UserSignModel) {

    return this.http.post(`${this.url}/signup`,user  ).pipe(tap(
      (res: any) => {
        if (res) {
          // guardar token
          console.log(res.accessToken)
          this.saveToken(res.accessToken);
        }
      })
    );

   }

   logout(): void {
    this.token = '';
    localStorage.removeItem("token");
    
  }

   private saveToken(token: string): void {
    localStorage.setItem("token", token);
   
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    return this.token;
  }
}

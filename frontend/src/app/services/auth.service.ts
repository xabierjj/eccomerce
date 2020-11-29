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
            this.saveToken(res.accessToken, res.expiresIn);
          }
        })
      );

   }

   signup(user:UserSignModel) {

    return this.http.post(`${this.url}/signup`,user  ).pipe(tap(
      (res: any) => {
        if (res) {
          // guardar token
          this.saveToken(res.accessToken, res.expiresIn);
        }
      })
    );

   }

   logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

   private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
}

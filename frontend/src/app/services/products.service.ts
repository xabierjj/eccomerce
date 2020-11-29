import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url:string='http://localhost:3000'

  constructor(private http:HttpClient ) {

   }
  
  getProducts(){
    return this.http.get(`${this.url}/`)


  }
}

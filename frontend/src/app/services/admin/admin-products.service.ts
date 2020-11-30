import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  url:string='http://localhost:3000'

  constructor(private http:HttpClient ) {

   }
  
  getProducts(){
    return this.http.get(`${this.url}/`)


  }

   getOneProduct(id) {

    return  this.http.get(`${this.url}/admin/products/${id}`)

  }

  editProduct(product){
    return  this.http.post(`${this.url}/admin/products/${product.id}/edit`,product)
  }

  deleteProduct(id) {
    return  this.http.get(`${this.url}/admin/products/${id}/delete`)

  }


}

import { Component, OnInit } from '@angular/core';
import {AdminProductsService} from '../../../services/admin/admin-products.service'
import { NgForm } from '@angular/forms';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product:any
  id:string
  constructor( private _adminProductService: AdminProductsService, private activatedRoute: ActivatedRoute) {
    
    this.activatedRoute.params.subscribe( params => {
      
      this.id=params['id']
      this._adminProductService.getOneProduct(this.id).subscribe(res=>  {
      
        this.product=res
        console.log(res)
      })
   
    })
    
   }  

  ngOnInit(): void {
    
  }

  editProduct(form:NgForm)  {
    if (form.invalid) {
      return
    }


    this._adminProductService.editProduct(this.product).subscribe(res=>  {
      
      
      console.log(res)
    })

  }

  

}

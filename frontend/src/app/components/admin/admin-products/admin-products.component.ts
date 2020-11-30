import { Component, OnInit } from '@angular/core';
import {AdminProductsService} from '../../../services/admin/admin-products.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnInit {
  products:any
  constructor(private _adminProductsService : AdminProductsService ,  private router:Router) { 
    this._adminProductsService.getProducts().subscribe(res=> {
      this.products = res
    })
  }

  ngOnInit(): void {
  }

  editProduct(product) {

    this.router.navigate(['/admin/products/edit/',product.id ])
  }

  deleteProduct(id) {
    console.log(id)
    this._adminProductsService.deleteProduct(id).subscribe(res => {
      console.log(res)

      this.products = this.products.filter(product=> {return product.id!=id})
      
    })
  }
}

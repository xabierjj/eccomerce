import { Component, OnInit } from '@angular/core';
import {AdminProductsService} from '../../../services/admin/admin-products.service'
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnInit {
  products:any
  constructor(private _adminProductsService : AdminProductsService) { 
    this._adminProductsService.getProducts().subscribe(res=> {
      this.products = res
    })
  }

  ngOnInit(): void {
  }

}

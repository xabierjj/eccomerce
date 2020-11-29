import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products:any;

  constructor( private _productsService : ProductsService) {
    
    

   }

  ngOnInit(): void {
    this._productsService.getProducts().subscribe((res) => {
      console.log(res)
      this.products=res
    });
  }

}

import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {
  imgUrl:string
 @Input() product:any
  constructor() { }

  ngOnInit(): void {
    this.imgUrl = 'data:image/png;base64,' + this.product.image;
  }

}

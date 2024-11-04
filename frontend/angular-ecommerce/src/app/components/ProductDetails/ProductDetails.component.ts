import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/Product";
import {ProductService} from "../../services/ProductService/Product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ProductDetails',
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  private handleProductDetails() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
    })
  }
}

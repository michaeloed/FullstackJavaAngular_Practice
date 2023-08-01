import {Component} from '@angular/core';
import {Product} from "../../common/Product";
import {ProductService} from "../../services/ProductService/Product.service";

@Component({
  selector: 'app-ProductList',
  templateUrl: './ProductList.component.html',
  styleUrls: ['./ProductList.component.css']
})
export class ProductListComponent {

  ProductList: Product[] = [];

  constructor(private producService: ProductService) {
  }

  ngOnInit(): void {
    this.producService.getProductList().subscribe(
      data => this.ProductList = data);
  }

}

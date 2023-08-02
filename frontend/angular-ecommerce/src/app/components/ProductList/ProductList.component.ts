import {Component} from '@angular/core';
import {Product} from "../../common/Product";
import {ProductService} from "../../services/ProductService/Product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ProductList',
  templateUrl: './ProductList-grid.component.html',
  styleUrls: ['./ProductList.component.css']
})
export class ProductListComponent {

  ProductList: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  private listProducts() {
    const hasCategoryId: Boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => this.ProductList = data);
  }
}

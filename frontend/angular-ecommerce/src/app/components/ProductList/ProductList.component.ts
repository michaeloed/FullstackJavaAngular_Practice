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
  searchMode: Boolean = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  private listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: Boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => this.ProductList = data);
  }

  private handleSearchProducts() {
    this.productService.searchProducts(this.route.snapshot.paramMap.get('keyword')!).subscribe(
      data => this.ProductList = data);
  }
}

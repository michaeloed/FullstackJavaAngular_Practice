import {Component} from '@angular/core';
import {ProductCategory} from "../../common/ProductCategory";
import {ProductService} from "../../services/ProductService/Product.service";

@Component({
  selector: 'app-Menubar',
  templateUrl: './Menubar.component.html',
  styleUrls: ['./Menubar.component.css']
})
export class MenubarComponent {

  categoryList: ProductCategory[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.listCategories();
  }

  private listCategories() {
    this.productService.getProductCategories()
      .subscribe((data) => {
        console.log('Product categories: ' + JSON.stringify(data));
        this.categoryList = data;
      });
  }
}

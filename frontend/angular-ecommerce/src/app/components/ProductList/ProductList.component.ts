import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/Product";
import {ProductService} from "../../services/ProductService/Product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
    selector: 'app-ProductList',
    templateUrl: './ProductList-grid.component.html',
    styleUrls: ['./ProductList.component.css']
})
export class ProductListComponent implements OnInit {

    ProductList: Product[] = [];
    currentCategoryId: number = 1;
    private previousCategoryID: number = 1;
    searchMode: Boolean = false;

    page: number = 1;
    pageSize: number = 10;
    totalElements: number = 0;

    constructor(private productService: ProductService,
                private route: ActivatedRoute,
                private cartService: CartService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
    }

    listProducts() {
        this.searchMode = this.route.snapshot.paramMap.has('keyword');
        if (this.searchMode) {
            this.handleSearchProducts();
        } else {
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
        // Check if we have a different category id. If so set page number to 1
        if (this.previousCategoryID != this.currentCategoryId) {
            this.page = 1;
        }
        this.previousCategoryID = this.currentCategoryId;
        console.log(`currentCategoryId=${this.currentCategoryId}, page=${this.page}`);
        this.productService.getProductListPaginate(this.page - 1,
            this.pageSize,
            this.currentCategoryId)
            .subscribe(data => {
                this.ProductList = data._embedded.products;
                this.page = data.page.number + 1;
                this.pageSize = data.page.size;
                this.totalElements = data.page.totalElements;
            });
    }

    private handleSearchProducts() {
        this.productService.searchProducts(this.route.snapshot.paramMap.get('keyword')!).subscribe(
            data => this.ProductList = data);
    }

    addToCart(product: Product) {
        console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
        const cartItem: CartItem = new CartItem(product);
        this.cartService.addToCart(cartItem);
    }
}

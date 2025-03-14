import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../common/Product";
import {map} from 'rxjs'
import {ProductCategory} from "../../common/ProductCategory";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:8080/api';
  private productsUrl: string = `${this.baseUrl}/products`;
  private productCategoryUrl: string = `${this.baseUrl}/product-category`;
  private searchProductsUrl: string = `${this.productsUrl}/search`


  constructor(private httpClient: HttpClient) {
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl: string = `${this.searchProductsUrl}/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProducts> {
    const searchUrl: string = `${this.searchProductsUrl}/findByCategoryId?id=${categoryId}` +
                               `&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetCategoryResponse>(this.productCategoryUrl)
      .pipe(map(response => response._embedded.productCategory));
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl: string = `${this.searchProductsUrl}/searchByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }

  getProduct(id: number): Observable<Product> {
    const searchUrl: string = `${this.productsUrl}/${id}`;
    return this.httpClient.get<Product>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

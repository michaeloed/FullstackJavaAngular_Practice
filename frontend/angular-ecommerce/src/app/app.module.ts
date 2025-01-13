import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ProductListComponent} from "./components/ProductList/ProductList.component";
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/ProductService/Product.service";
import {Routes, RouterModule} from "@angular/router";
import {MenubarComponent} from "./components/Menubar/Menubar.component";
import {SearchbarComponent} from "./components/Searchbar/Searchbar.component";
import {ProductDetailsComponent} from "./components/ProductDetails/ProductDetails.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    MenubarComponent,
    SearchbarComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

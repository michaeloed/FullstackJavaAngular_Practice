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
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";
import myAppConfig from "./config/my-app-config";
import {ReactiveFormsModule} from "@angular/forms";
import { CartStatusComponent } from './components/cart-status/cart-status.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  {path: "login/callback", component: OktaCallbackComponent},
  {path: "login", component: LoginComponent},
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
    ProductDetailsComponent,
    LoginComponent,
    LoginStatusComponent,
    CartStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }

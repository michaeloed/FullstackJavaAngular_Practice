import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-Searchbar',
  templateUrl: './Searchbar.component.html',
  styleUrls: ['./Searchbar.component.css']
})
export class SearchbarComponent {

  constructor(private router: Router) {
  }

  searchProduct(keyword: string) {
    console.log(`searchProduct: keyword=${keyword}`);
    this.router.navigateByUrl(`search/${keyword}`);
  }
}

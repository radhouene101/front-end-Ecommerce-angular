import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {Router} from "@angular/router";
import {AuthentificationService} from "./services/authentification.service";
import {CaddyService} from "./services/caddy.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  categories ;
  currentCategorie;

  constructor(private catService:CatalogueService, private  router:Router,
              public  authService:AuthentificationService,
              public caddyService:CaddyService) {
  }


  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();
  }

  private getCategories() {
    this.catService.getResource("categories/")
      .subscribe(data=>{
        this.categories=data;
      },err=>{
        console.log(err);
      })
  }

  getProductsByCat(c) {
    this.currentCategorie=c;
    this.router.navigateByUrl('products/2/'+c.id);
  }

  onSelectedProducts($event: MouseEvent) {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/3/0")
  }

  onProductsPromo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/3/0")
    console.log("nekhdem ala rouhy promo")
  }

  onProductDispo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/4/0")
    console.log(" nekhem ala rouhy disponible")
  }

  onLogout() {
    this.authService.removeRemoveTokenFromLocalStorage();
    this.router.navigateByUrl("/login")
  }
}

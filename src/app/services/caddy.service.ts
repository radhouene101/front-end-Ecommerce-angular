import {Injectable} from '@angular/core';
import {Caddy} from "../model/caddy.model";
import {Product} from "../model/product.model";
import {ProductItem} from "../model/product-item.model";

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  public currentCaddyName = "Caddy1";
  public caddies: Map<string, Caddy> = new Map();
  private productItem: any;
  public caddy = new Caddy(this.currentCaddyName)

  constructor() {
    let caddy = new Caddy(this.currentCaddyName);
    this.caddies.set(this.currentCaddyName, caddy);
  }

  public AddProductToCaddy(product: Product): void {
    let caddy = this.caddies.get(this.currentCaddyName);
    let productItem: ProductItem = this.productItem.caddy.items.get(product.id);
    console.log(caddy)
    if (productItem) {
      if (productItem.quantity)
        productItem.quantity += product.quantity;

    } else {
      productItem = new ProductItem();
      productItem.price = product.currentPrice;
      productItem.quantity = product.quantity;
      productItem.product = product;
      if (caddy) {
        caddy.items.set(product.id, productItem);
      }
    }


  }

  getCurrentCaddy() {
    return this.caddies.get(this.currentCaddyName)

  }
}

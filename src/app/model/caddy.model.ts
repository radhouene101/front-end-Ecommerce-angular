import {ProductItem} from "./product-item.model";


export class Caddy{

  constructor(name:string) {
    this.name=name;
  }
  public name:string;
  public items:Map<number,ProductItem>=new Map();


}

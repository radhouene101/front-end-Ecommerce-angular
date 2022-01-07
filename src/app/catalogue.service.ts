import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./model/product.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
public host:string;
  constructor(private  http:HttpClient) {
    this.host="http://localhost:3023/"
  }

  public getResource ( url ){
    return this.http.get(this.host+url);
  }
  public getproduct(url):Observable<Product>{
    return this.http.get<Product>(url)
  }

  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


}

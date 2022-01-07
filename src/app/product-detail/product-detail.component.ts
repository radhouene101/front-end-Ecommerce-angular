import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../model/product.model";
import {CatalogueService} from "../catalogue.service";
import {AuthentificationService} from "../services/authentification.service";
import {ProductsComponent} from "../products/products.component";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {CaddyService} from "../services/caddy.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  currentProduct:any;
  selectedFiles;
  progress: number | undefined;
  currentFileUpload: any;
  currentTime: number | undefined;
  editPhoto: boolean | undefined;
  mode: number=0;
  private timeStamp: number | undefined;

  constructor(private router: Router, private route: ActivatedRoute,
              public authService: AuthentificationService,
              public catalService:CatalogueService,
              public caddyService:CaddyService)
              { }

  ngOnInit(): void {
    let url=atob(this.route.snapshot.params['url']);
    this.catalService.getproduct(url).subscribe(data => {
      this.currentProduct=data;
    })
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }
  getCurrentProduct(){
    return this.currentTime;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total) {
          const total: number = event.total;
          this.progress = Math.round(100 * event.loaded / total);
          console.log("uploaded "+this.progress+"%")
        }
        //this.progress = Math.round(100 * event.loaded / event.total );
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.timeStamp = Date.now();
        // alert("télechargement avec succées")
      }
    }, err => {
      alert("Problème de chargement");
    })
  }



  getTS() {
    return this.currentTime;
  }



  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data) {
  }

  onAddProductToCaddy(p: Product) {

  }
}

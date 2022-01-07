import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthentificationService} from "../services/authentification.service";
import {Product} from "../model/product.model";
import {CaddyService} from "../services/caddy.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products;
   editPhoto: boolean | undefined;
   currentProduct: any;
   ambienceUploadForm: any;
   selectedFiles: any;
   progress: number | undefined;
   currentFileUpload: any;
   currentTime: number | undefined;
   title: string = "";
   timeStamp: number=0;

  constructor(
    public catService:CatalogueService,
    private route: ActivatedRoute,private router:Router,
    public authService: AuthentificationService,
    public caddyService: CaddyService,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((value)=>{
      if(value instanceof NavigationEnd){
        let url=value.url;
        console.log(url)
        //console.log(this.route.snapshot.data)
        let p1=this.route.snapshot.params['p1']
        if (p1==1){
          this.title="a la une"
          this.getProducts("products/search/selectedProducts");
        }
        else if (p1==2){
          let idCat=this.route.snapshot.params['p2']
          this.title="produit de la categorie "+idCat;
          this.getProducts('categories/'+idCat+'/products');
        }
        else if (p1==3){
          this.title="produit en promotion ";
          this.getProducts('products/search/promoProducts');
        }
        else if (p1==4){
          this.title="produit disponible ";
          this.getProducts('products/search/dispoProducts');
        }
        else if (p1==5){
          this.title="recherche...";
          this.getProducts('products/search/dispoProducts');
        }
        console.log()

      }
    });
    let p1=this.route.snapshot.params['p1']
    if (p1==1){
      this.getProducts("products/search/selectedProducts");
    }

  }

  private getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data =>
      this.products=data
      ),error=>{
      console.log(error);
    }
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }



    onSelectedFile(event){
      this.selectedFiles = event.target.files;
      console.log("File Data", this.currentProduct)
      if (this.currentProduct.type == '*') {
        this.ambienceUploadForm.patchValue({
          mainFileUpload: this.currentProduct,
        })
      }

  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
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
    return this.timeStamp;
  }

  onProductDetails(p:Product) {
    let url =btoa(p._links.product.href);
      this.router.navigateByUrl("product-detail/"+url);
  }


  onAddProductToCaddy(p:Product) {
    this.caddyService.AddProductToCaddy(p);

  }
}

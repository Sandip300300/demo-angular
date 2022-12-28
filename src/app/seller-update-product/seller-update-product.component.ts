import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData:undefined|product
  editProductMessage:string;
  constructor(private route:ActivatedRoute,private product:ProductService,private router: Router ) { }

  ngOnInit(): void {
    this.loadSingleProduct()
  }
  update(data:product){
   this.product.updateProduct(data).subscribe((result)=>{
    if(this.productData){
      data.id=this.productData.id
    }
      if(result){
        this.editProductMessage='Product Updated SuccessFully';
      }
   });
   setTimeout(()=>{
    this.editProductMessage=undefined;
    this.router.navigate(['/seller-home']);
   },3000);
  }
  loadSingleProduct(){
    let productId=this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((data)=>{
      this.productData=data;
    })
  }
}

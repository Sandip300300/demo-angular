import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData:undefined|product;
  productQuentity:number=1;
  removeCart=false;

  constructor(private activeRoute:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let productID=this.activeRoute.snapshot.paramMap.get('productId');
    productID && this.product.getProduct(productID).subscribe((result)=>{
      this.productData=result;

      let cartData=localStorage.getItem('localCart');
      if(productID && cartData){
        let items=JSON.parse(cartData);
        items=items.filter((item:product)=>productID==item.id.toString());
        if(items.length){
          this.removeCart=true;
        }else{
          this.removeCart=false;
        }

      }
    })

  }
  handleQuantity(val:string){
      if(this.productQuentity>1 && val==='min'){
        this.productQuentity--;
      }
      if(this.productQuentity<20 &&  val==='plus'){
        this.productQuentity++;
      }
  }
  AddToCart(){
    if(this.productData){
      this.productData.quantity=this.productQuentity;
      if(!localStorage.getItem('user')){

        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      }
      else{

        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id

        let cartData:cart={
          ...this.productData,userId,
          productID:this.productData.id,
        }
        delete cartData.id;
       
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            alert('Product is added to cart')
          }
        })
      }

    }
  }
  removeToCart(productID:number){
    this.product.removeItemFromCart(productID);
    this.removeCart=false;
  }
}

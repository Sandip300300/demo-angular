import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string='default'
  sellerName:string='';
  searchResult:undefined|product[]
  userName:string="";
  cartItem:number=0;
  constructor(private route:Router,private product:ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){

        if(localStorage.getItem('seller')&& val.url.includes('seller')){

          this.menuType='seller';
          if(localStorage.getItem('seller')){
            let sellerStore=localStorage.getItem('seller');
            let sellerData=sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName=sellerData.name;
          }
        }else if(localStorage.getItem('user')){
            let userStore=localStorage.getItem('user');
            let userData=userStore && JSON.parse(userStore);
            this.userName=userData.email;
            this.menuType='user';
        }
        else{

          this.menuType='default'
        }
      }
    })
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItem=JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItem=items.length;
    })
  }
  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/']);
  }
  srarchProduct(query:KeyboardEvent){
    if(query){
      const element=query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((result)=>{
        if(result.length>5){
          result.length=5;
        }

        this.searchResult=result;
      })

    }
  }
  hideSearch(){
    this.searchResult=undefined;
  }
  submitSearch(val:string){
    this.route.navigate([`search/${val}`])
  }
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id]);
  }
  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth']);
  }
}

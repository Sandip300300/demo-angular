import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService,private router:Router) { }
  showLogin=true;
  authEroor:string='';
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data:SignUp):void{

    this.seller.userSignUp(data)
  }
  openLogin(){
    this.showLogin=!this.showLogin
  }
  login(data:SignUp){
    this.authEroor='';
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authEroor="Email or password is not correct"
      }
    })
  }
}

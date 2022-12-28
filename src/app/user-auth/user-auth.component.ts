import { Component, OnInit } from '@angular/core';
import { Login } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  authError:string='';
  constructor(private user:UserService) { }
  IsLoggedIn:boolean=true;
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  singUp(data:any){
    this.user.userSignUp(data)
  }
  login(data:Login){
   this.user.userLogin(data);
   this.user.InvaliduserAuth.subscribe((result)=>{
    if(result){
      this.authError='Please enter Valid User Details';
    }
   })
  }

  openSignUp(){
    this.IsLoggedIn=false
  }
  openLogIn(){
    this.IsLoggedIn=true;
  }
  localCartToRemove(){
    
  }
}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp, Login } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  InvaliduserAuth=new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(user: SignUp) {
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  userLogin(data: Login) {
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if(result){
          if (result && result.body?.length) {
            this.InvaliduserAuth.emit(false);
            localStorage.setItem('user', JSON.stringify(result.body[0 ]));
            this.router.navigate(['/']);
          }
          else{
            this.InvaliduserAuth.emit(true);
          }
        }
      });
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}

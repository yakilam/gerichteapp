import { Injectable } from '@angular/core';
import { IToken } from '../token';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  isLoggedInChanged: Subject<boolean> = new Subject<boolean>();
  isUnknownUser: boolean = false;
  isUnknownUserChanged: Subject<boolean> = new Subject<boolean>();
  isRegisteredChanged: Subject<string> = new Subject<string>();
  isAdmin: boolean = false;
  token = <IToken>{};

  constructor(private http: HttpClient) { 
    this.isLoggedInChanged.subscribe((value) => {
      this.isLoggedIn = value;
  });
  this.isUnknownUserChanged.subscribe((value) => {
    this.isUnknownUser = value;
});
  }

  login(values: Object) {
    localStorage.removeItem("token");
    this.http.post<IToken>('http://localhost:8080/api/v1/auth/authentication', values, { observe: 'response' }).subscribe(res => {
      if(res.ok && res.body != null){
        this.token = res.body;
        localStorage.setItem("token",this.token.token);
        this.isLoggedInChanged.next(true);
      } else {
        this.isUnknownUser = true;
      }
    });
  }

  register(values: Object){
    this.http.post<IToken>('http://localhost:8080/api/v1/auth/register', values, { observe: 'response' }).subscribe(res => {
      if(res.ok && res.body != null){
        this.token = res.body;
        if(this.token.token === "User existiert bereits"){
          this.isRegisteredChanged.next(this.token.token);
        } else {
          localStorage.setItem("token",this.token.token);
          this.isRegisteredChanged.next("Registrierung erfolgreich!");
          this.isLoggedInChanged.next(true);
        }
      } 
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.isLoggedInChanged.next(false);
  }

}

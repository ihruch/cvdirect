import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authUrl = 'https://reqres.in/api';
  private loggedIn = false;

  constructor(
    private http: HttpClient
  ) {
    this.loggedIn = !!localStorage.getItem('auth_token');
   }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, {email, password})
      .pipe(
        retry(2),
        tap(res => {
          if (res['token']) {
            localStorage.setItem('auth_token', res['token']);
            this.loggedIn = true;
          }
        }),
      );
  } 

  isLoggedIn() {
    return this.loggedIn;
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

}

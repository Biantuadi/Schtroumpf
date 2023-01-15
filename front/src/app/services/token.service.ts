import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  decodeToken() {
    const token: any = (localStorage.getItem('token')) ? localStorage.getItem('token') : null;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken;
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  isAdmin(): boolean {
    const role = this.decodeToken().role;
    return (role == 'admin') ? true : false;
  }
}

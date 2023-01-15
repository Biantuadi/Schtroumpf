import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.apiUrl;
  private isLoggedInSource = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  signup(values: any) {
    return this.http.post(`${this.API_URL}/signup`, values)
  }

  login(values: any) {
    return this.http.post(`${this.API_URL}/login`, values)
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.changeAuthStatus(false);
  }

  changeAuthStatus(value: boolean) {
    this.isLoggedInSource.next(value); /* Il attend un boolean.pour changer le status de l'observable. */
  }

  get isLoggedInSource$() {
    return this.isLoggedInSource.asObservable(); /* On va retourner l'observable. */
  }
}

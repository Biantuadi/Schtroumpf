import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signup(values: any) {
    return this.http.post(`${this.API_URL}/signup`, values)
  }

  login(values: any) {
    return this.http.post(`${this.API_URL}/login`, values)
  }
}

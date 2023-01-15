import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchtroumpfService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  }

  getschtroumpfs() {
    return this.http.get(`${this.apiUrl}/`, this.httpOptions);
  }

  updateSchtroumpf(id: string, schtroumpf: any) {
    return this.http.put(`${this.apiUrl}/${id}`, schtroumpf, this.httpOptions);
  }

  deleteSchtroumpf(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}

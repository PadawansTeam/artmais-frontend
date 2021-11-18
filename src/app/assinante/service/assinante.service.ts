import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssinanteService {
  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAssinaturaPremium(): Observable<any> {    
    return this.http.get(`${this.artPlusURL}` + `v1/Signature/GetSignatureUserDto`, this.httpOptions);
  }

  getArtista(userId: number): Observable<any> {
   return this.http.get(`${this.artPlusURL}` + `v1/User/${userId}`, this.httpOptions);
  }

}


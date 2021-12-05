import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ArtistaService {
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

  getValidation(): Observable<any> {
    return this.http.post(this.artPlusURL + 'v1/Validation', {}, this.httpOptions);
  }

  getArtista(userId: number): Observable<any> {
    this.router.navigate(['/artista', userId]);
    return this.http.get(`${this.artPlusURL}` + `v1/User/${userId}`, this.httpOptions);
  }

  getPortfolioArtista(userId: number): Observable<any> {
    this.router.navigate(['/artista', userId]);
    return this.http.get(`${this.artPlusURL}` + `v1/Portfolio/${userId}`, this.httpOptions);
  }


}

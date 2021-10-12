import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstrucaoService {
  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token')

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {
    if (this.token == undefined || this.token == null) {
      this.router.navigate(['']);
    }
  }

  getValidation(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/Validation', this.httpOptions);
  }
}

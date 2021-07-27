import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InteresseService {
  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token')

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  constructor(private http: HttpClient) {}

  getInterests(): Observable<any>{
    return this.http.get(this.artPlusURL + 'v1/Interest', this.httpOptions)
  }

  sendInterests(
    subcategoryID: number[],
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/Interest',
      { subcategoryID },
      this.httpOptions
    );
  }
}
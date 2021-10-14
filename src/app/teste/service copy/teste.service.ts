import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({  
  providedIn: 'root',
})
export class TesteService {

  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token');

  PortfolioFolder = 'portfolio-pictures/';
  DateTimeNow = new Date();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  customHttpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/User', this.httpOptions);
  }

  getRecommendations(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/Recomendation', this.httpOptions)
  }

  visitedProfiles(
    visitedUserId: number
  ): Observable<object> {
    return this.http.post(this.artPlusURL + 'v1/ProfileAccess/' + visitedUserId, {}, this.httpOptions);
  }

  recomentationUsers(): Observable<object> {
    return this.http.get(this.artPlusURL + 'v1/Recomendation/users', this.httpOptions)
  }
}



  


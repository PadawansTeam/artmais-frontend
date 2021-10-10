import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
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

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {
    if (this.token == undefined || this.token == null) {
      this.router.navigate(['']);
    }
  }

  getUser(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/User', this.httpOptions);
  }

  getUserPortfolio(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/Portfolio', this.httpOptions);
  }

  insertPortfolioContent(formData: FormData): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}v1/aws/InsertPortfolioContent`,
      formData,
      this.customHttpOptions
    );
  }

  updatePortfolioDescription(
    publicationId: number,
    publicationDescription: string
  ): Observable<object> {
    return this.http.patch<object>(
      `${this.artPlusURL}` + 'v1/Portfolio/UpdateDescription',
      { publicationId, publicationDescription },
      this.httpOptions
    );
  }
}

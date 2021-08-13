import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

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

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/User', this.httpOptions);
  }

  getUserPortfolio(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/Portfolio', this.httpOptions);
  }

  insertPortfolioContent(
    portfolioImageUrl: string,
    description: string
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/Portfolio/InsertPortfolioContent',
      { portfolioImageUrl, description },
      this.httpOptions
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

  async uploadPortfolioFile(file: File, userID: number): Promise<string> {
    const fileName = ((this.DateTimeNow.getTime() * 10000) + 621355968000000000);
    const fileType = file.type.split('/').pop();
    const bucket = new S3({
      accessKeyId: `${environment.accessKeyId}`,
      secretAccessKey: `${environment.secretAccessKey}`,
      region: 'us-east-1',
    });

    const params = {
      Bucket: `${environment.bucket}`,
      ContentType: file.type.split('.').pop(),
      Key: this.PortfolioFolder + `${userID}/` + fileName + `.${fileType}`,
      Body: file,
      ACL: 'public-read',
    };

    const upload = bucket.upload(
      params,
      function (err: any, data: any): Observable<object> {
        if (err) {
          return err;
        }

        return data;
      }
    );

    const promise = upload.promise();
    const url = await promise.then(
      function (data) {
        return data.Location;
      },
      function (err) {
        return err;
      }
    );

    return url;
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { buildWebpackBrowser } from '@angular-devkit/build-angular/src/browser';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracaoService {
  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token');

  FOLDER = 'profile-pictures/2/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/User', this.httpOptions);
  }

  getContactInfo(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/Contact', this.httpOptions);
  }

  getAddress(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/Address', this.httpOptions);
  }

  updateUserInfo(
    name: string,
    username: string,
    userPicture: string,
    backgroundPicture: string,
    birthDate: Date,
    mainPhone: string,
    secundaryPhone: string,
    thirdPhone: string
  ): Observable<object> {
    return this.http.put<object>(
      `${this.artPlusURL}` + 'v1/User/UpdateUserInfo',
      { name, username, userPicture, backgroundPicture, birthDate, mainPhone, secundaryPhone, thirdPhone },
      this.httpOptions
    );
  }

  updatePassword(
    oldPassword: string,
    newPassword: string,
    password: string
  ): Observable<object> {
    return this.http.patch<object>(
      `${this.artPlusURL}` + 'v1/User/UpdateUserPassword',
      { oldPassword, newPassword, password },
      this.httpOptions
    );
  }

  updateDescription(description: string): Observable<object> {
    return this.http.patch<object>(
      `${this.artPlusURL}` + 'v1/User/UpdateUserDescription',
      { description },
      this.httpOptions
    );
  }

  updateContact(
    facebook: string,
    instagram: string,
    twitter: string,
    mainPhone: string,
    secundaryPhone: string,
    thirdPhone: string
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/Contact/Upsert',
      { facebook, instagram, twitter, mainPhone, secundaryPhone, thirdPhone },
      this.httpOptions
    );
  }

  updateAddress(
    street: string,
    number: number,
    complement: string,
    neighborhood: string,
    zipCode:string,
    city: string,
    state: string
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/Address/Upsert',
      { street, number, complement, neighborhood, zipCode, city, state },
      this.httpOptions
    );
  }

  uploadfile(file: File) {
    let awsResult: any = {};
    const bucket = new S3({
      accessKeyId: 'AKIA3HSZCE6ZIDLOOE5F',
      secretAccessKey: '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',
      region: 'us-east-1',
    });

    const params = {
      Bucket: 'bucket-artmais',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read',
    };

    bucket.upload(params, function (err: any, data: any): Observable<object> {
      if (err) {
        return err;
      }

      awsResult.url = data['Location'];
      return data['Location'];
    });

    return awsResult;
  }
}

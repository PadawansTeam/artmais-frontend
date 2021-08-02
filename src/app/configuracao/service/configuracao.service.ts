import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
var AWS = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {
  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token')

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  // aws.config.update({
  //       secretAccessKey: 'a5JICmPidT2YSRgmzl/gOxIm6nuGvj2s5XH4WE1A',
  //       accessKeyId: 'ASIA4GZ6YP6NVYYNEHFG',
  //       region: 'us-east-1',
  //   });
  
    // const s3 = new aws.S3();

  public s3: any;

  constructor(private http: HttpClient) {
    AWS.config.getCredentials(function(err: any) {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
      }
    });
    this.s3 = new AWS.S3({
      endpoint: 'https://artplus-bucket.s3-accelerate.amazonaws.com',
      secretAccessKey: 'a5JICmPidT2YSRgmzl/gOxIm6nuGvj2s5XH4WE1A',
      accessKeyId: 'ASIA4GZ6YP6NVYYNEHFG',
      region: 'us-east-1',
    });
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
  }

  getUserInfo(): Observable<any>{
    return this.http.get(this.artPlusURL + 'v1/User', this.httpOptions)
  }

  getContactInfo(): Observable<any>{
    return this.http.get(this.artPlusURL + 'v1/Contact', this.httpOptions)
  }

  getAddress(): Observable<any>{
    return this.http.get(this.artPlusURL + 'v1/Address', this.httpOptions)
  }

  fileUpload(file: FormData) {
    // return this.http.post('https://artplus-bucket.s3-accelerate.amazonaws.com', file, this.httpOptions);
  }

  updateUserInfo(
    name: string,
    username: string,
    userPicture: string,
    birthDate: Date,
    mainPhone: string,
    secundaryPhone: string,
    thirdPhone: string
  ): Observable<object> {
    return this.http.put<object>(
      `${this.artPlusURL}` + 'v1/User/UpdateUserInfo',
      { name, username, userPicture, birthDate, mainPhone, secundaryPhone, thirdPhone },
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

  updateDescription(
    description: string,
  ): Observable<object> {
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
    thirdPhone: string,
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
    zipCode:string
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/Address/Upsert',
      { street, number, complement, neighborhood, zipCode },
      this.httpOptions
    );
  }
}

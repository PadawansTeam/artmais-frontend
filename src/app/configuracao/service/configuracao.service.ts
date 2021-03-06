import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracaoService {
  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token');

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
  ) { }

  ngOnInit(): void {
    if (this.token == undefined || this.token == null) {
      this.router.navigate(['']);
    }
  }

  getValidation(): Observable<any> {
    return this.http.post(this.artPlusURL + 'v1/Validation', {}, this.httpOptions);
  }

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
    backgroundPicture: string,
    birthDate: Date,
    mainPhone: string,
    secundaryPhone: string,
    thirdPhone: string
  ): Observable<object> {
    return this.http.put<object>(
      `${this.artPlusURL}` + 'v1/User/UpdateUserInfo',
      {
        name,
        username,
        backgroundPicture,
        birthDate,
        mainPhone,
        secundaryPhone,
        thirdPhone,
      },
      this.httpOptions
    );
  }

  updateUserPicture(userPicture: FormData): Observable<object> {
    return this.http.put<object>(
      `${this.artPlusURL}v1/aws/updateProfilePicture`,
      userPicture,
      this.customHttpOptions
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
    zipCode: string,
    city: string,
    state: string
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/Address/Upsert',
      { street, number, complement, neighborhood, zipCode, city, state },
      this.httpOptions
    );
  }
}

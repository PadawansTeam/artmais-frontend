import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginDto {
  email: string;
  password: string;
}
export interface LoginResponseDto {
  token: string;
}

@Injectable()
export class LoginService {
  public artPlusURL = `${environment.apiURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<any> {
    const response = this.http.post(
      `${this.artPlusURL}` + 'v1/SignIn',
      { email, password },
      this.httpOptions
    );
    console.log(response)
    return response;
  }
}

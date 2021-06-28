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
  public loginURL = `${environment.apiURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      `${this.loginURL}` + 'v1/SignIn',
      { email, password },
      this.httpOptions
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginDto {
  email: string;
  password: string;
}
export interface LoginResponseDto {
  token: string;
}
@Injectable()
export class LoginService {
  loginURL = 'http://google.com';
  constructor(private http: HttpClient) {}

  public authenticate(loginDto: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.loginURL}`, loginDto);
  }
}

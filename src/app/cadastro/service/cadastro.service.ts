import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CadastroDto {
  name: string;
  surname: string;
  socialName: string;
  email: string;
  password: string;
}

@Injectable()
export class CadastroService {
  public artPlusURL = `${environment.apiURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  signUp(
    name: string,
    surname: string,
    socialName: string,
    email: string,
    password: string
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/SignUp',
      { name, surname, socialName, email, password },
      this.httpOptions
    );
  }
}

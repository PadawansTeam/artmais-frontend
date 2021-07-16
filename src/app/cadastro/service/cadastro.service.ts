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
  role: string;
  category: string;
  subcategory: string;
  birthDate: string;
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

  getAll(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/SignUp', this.httpOptions)
  }

  signUp(
    name: string,
    email: 'user@example.com',
    password: string,
    username: string,
    birthDate: "2021-07-10T13:03:32.650Z",
    role: string,
    category: string,
    subcategory: string,
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/SignUp',
      { name, email, password, username, birthDate, role, category, subcategory },
      this.httpOptions
    );
  }
}

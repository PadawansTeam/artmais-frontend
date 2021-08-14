import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CadastroDto {
  externalAuthorizationId: string;
  name: string;
  email: string;
  username: string;
  birthDate: Date;
  category: string;
  subcategory: string;
  subcategoryID: 0;
  description: string;
  userPicture: string;
  backgroundPicture: string;
}

@Injectable()
export class CadastroOAuthService {
  public artPlusURL = `${environment.apiURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  signUp(
    externalAuthorizationId: string | null,
    name: string,
    email: string | null,
    username: string,
    birthDate: Date,
    category: string,
    subcategory: string,
    description: string,
    userPicture: string,
    backgroundPicture: string
  ): Observable<any> {
    return this.http.post<object>(
      `${this.artPlusURL}v1/Google/signup`,
      {
        externalAuthorizationId,
        name,
        email,
        username,
        birthDate,
        category,
        subcategory,
        description,
        userPicture,
        backgroundPicture,
      },
      this.httpOptions
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class VerificationCodeService {
  public artPlusURL = `${environment.apiURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  validateVerificationCode(
    userId: string | null,
    code: number
  ): Observable<any> {
    return this.http.get(
      `${this.artPlusURL}v1/PasswordRecovery/ValidateCode/${userId}/${code}`,
      this.httpOptions
    );
  }
}

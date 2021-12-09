import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class PasswordChangeService {
  public artPlusURL = `${environment.apiURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  updatePassword(
    userId: string | null,
    newPassword: string,
    newPasswordConfirmation: string
  ): Observable<any> {
    return this.http.patch(
      `${this.artPlusURL}v1/PasswordRecovery/UpdatePassword`,
      { userId, newPassword, newPasswordConfirmation },
      this.httpOptions
    );
  }
}

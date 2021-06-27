import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';
import { argv } from 'yargs';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

// @Component({
//   selector: 'app-root',
//   templateUrl: '../component/login.component.html',
//   styleUrls: ['../component/login.component.css'],
// })
// export class AppComponent {
//   title = environment.title;
//   apiURL = environment.apiURL;
// }

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public async authenticate() {
    const response = await fetch(`${url}/v1/signin`, { method: 'POST' });
    const body = await response.body;
    const token = { ...body };
    console.log(token);
    return token;
  }
}

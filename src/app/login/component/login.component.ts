import { Component } from '@angular/core';
import {
  LoginDto,
  LoginResponseDto,
  LoginService,
} from '../service/login.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Login } from '../service/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginURL = 'https://padawans-auth-poc.herokuapp.com/v1/SignIn';

  model = new Login('joao.teixeira@aluno.ifsp.edu.br', 'padawans#2021');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  constructor(private http: HttpClient, private loginService: LoginService) {}

  onClickSubmit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    let teste = {
      email: 'joao.teixeira@aluno.ifsp.edu.br',
      password: 'padawans#2021',
    } as LoginDto;
    this.http
      .post<LoginResponseDto>(`${this.loginURL}`, teste, httpOptions)
      .subscribe(
        (response) => {
          console.log(response);
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }
}

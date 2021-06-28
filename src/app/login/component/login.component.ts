import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto, LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  public login() {
    let teste = {
      email: 'joao.teixeira@aluno.ifsp.edu.br',
      password: 'padawans#2021',
    } as LoginDto;
    this.loginService.authenticate(teste).subscribe(
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

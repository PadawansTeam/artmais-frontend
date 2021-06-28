import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  errorMessage = '';
  redirectTo: string = '';
  roles: string[] = [];

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  email!: string;
  password!: string;

  onSubmit() {
    const { email, password } = this.form;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public loginArtPlus() {
    this.loginService.authenticate(this.email, this.password).subscribe(
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

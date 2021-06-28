import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: any = {
    email: null,
    password: null,
  };
  errorMessage = '';
  redirectTo: string = '';
  roles: string[] = [];

  constructor(private loginService: LoginService) {}

  public loginArtPlus() {
    this.loginService
      .authenticate(this.form.email, this.form.password)
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

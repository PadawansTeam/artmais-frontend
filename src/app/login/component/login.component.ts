import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

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

  constructor(private loginService: LoginService, private router: Router) {}

  public loginArtPlus() {
    this.loginService
      .authenticate(this.form.email, this.form.password)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.token != null) {
            this.router.navigateByUrl('/teste');
          }
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }
}

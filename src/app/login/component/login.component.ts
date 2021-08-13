import { Component } from '@angular/core';
import { LoginResponseDto, LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

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
  loginReturn: boolean = false;
  erroLogin: boolean = false;
  loginForm: FormGroup | undefined;
  socialUser: SocialUser = new SocialUser();
  isLoggedin: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.loginService
        .googleAuthenticate(this.socialUser.idToken)
        .subscribe((response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/homepage');
          return response;
        });
    });
  }

  public loginArtPlus() {
    this.loginService
      .authenticate(this.form.email, this.form.password)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/homepage');
          this.loginReturn = true;
        },
        (err) => {
          if (err.status == 422) {
            this.erroLogin = true;
          }
          throw err;
        }
      );
  }

  public loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}

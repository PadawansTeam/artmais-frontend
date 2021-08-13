import { Component } from '@angular/core';
import { LoginResponseDto, LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

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
  socialUser: SocialUser = new SocialUser();
  isLoggedin: boolean = false;
  formLogin!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ])
      ),
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

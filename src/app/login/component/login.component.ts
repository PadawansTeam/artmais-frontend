import { Component } from '@angular/core';
import { LoginResponseDto, LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  loaderOn: boolean = false;
  erroAPI: boolean = false;
  email: string = '';

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

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
  }

  public loginArtPlus() {
    this.loaderOn = true;
    this.loginService
      .authenticate(this.form.email, this.form.password)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.loaderOn = false;
          this.router.navigateByUrl('/homepage');
          this.loginReturn = true;
        },
        (err) => {
          if (err.status == 422) {
            this.loaderOn = false;
            this.erroLogin = true;
          } else {
            this.loaderOn = false;
            this.erroAPI = true;
          }
          throw err;
        }
      );
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.loginService.googleAuthenticate(this.socialUser.idToken).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/homepage');
          return response;
        },
        (err) => {
          if (err.status == 404) {
            localStorage.setItem('externalAuthorizationId', this.socialUser.id);
            localStorage.setItem('email', this.socialUser.email);
            this.router.navigateByUrl('/cadastro/oauth');
          }
          throw err;
        }
      );
    });
  }

  sendForgotPasswordMail(): void {
    this.loginService.passwordRecovery(this.email).subscribe(
      (response) => {
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('email', this.email);
        this.router.navigateByUrl('/verificacao');
        return response;
      },
      (err) => {
        if (err.status == 404) {
          this.Toast.fire({
            icon: 'error',
            title:
              localStorage.getItem('lang') === 'en-US'
                ? 'E-mail not found!'
                : 'E-mail não encontrado',
            text:
              localStorage.getItem('lang') === 'en-US'
                ? 'Send a valid e-mail!'
                : 'Envie um e-mail válido!',
          });
          throw err;
        }
        if (err.status == 500) {
          this.Toast.fire({
            icon: 'error',
            title:
              localStorage.getItem('lang') === 'en-US'
                ? 'Unknown error!'
                : 'Erro desconhecido',
            text:
              localStorage.getItem('lang') === 'en-US'
                ? 'Try again later!'
                : 'Tente novamente mais tarde!',
          });
          throw err;
        }
      }
    );
  }
}

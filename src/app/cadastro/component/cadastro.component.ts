import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../service/cadastro.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  form: any = {
    name: null,
    email: null,
    password: null,
    username: null,
    birthDate: null,
    role: null,
    category: null,
    subcategory: null,
    description: null,
    userPicture: null,
    backgroundPicture: null,
  };
  errorMessage = '';
  redirectTo: string = '';
  roles: string[] = [];
  arraySelect: any[] = [];
  isArtist = false;
  isClient = false;
  invalidField = false;
  loginForm: FormGroup | undefined;
  socialUser: SocialUser = new SocialUser();
  isLoggedin: boolean = false;
  constructor(
    private cadastroService: CadastroService,
    private router: Router,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.cadastroService.getAll().subscribe((response) => {
      this.arraySelect = response;
    });

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

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public checkIsClient() {
    this.isClient = true;
    this.isArtist = false;
    return;
  }

  public checkIsArtist() {
    this.isArtist = true;
    this.isClient = false;
    return;
  }

  public cadastroArtPlus() {
    if (this.form.category === null || this.form.category === '') {
      this.form.subcategory = 'Consumidor';
      this.form.category = 'Consumidor';
    } else {
      this.form.subcategory = this.form.category.split('_')[1];
      this.form.category = this.form.category.split('_')[0];
    }
    this.form.userPicture =
      'https://artplus-bucket.s3.amazonaws.com/profile_pic/default.png';
    this.form.backgroundPicture =
      'https://artplus-bucket.s3.amazonaws.com/background_pic/default.png';
    this.form.description = 'Olá! Sou novo na plataforma Art+!';
    if (
      this.form.name &&
      this.form.email &&
      this.form.password &&
      this.form.username &&
      this.form.birthDate &&
      this.form.role &&
      this.form.category &&
      this.form.subcategory &&
      this.form.description
    ) {
      this.cadastroService
        .signUp(
          this.form.name,
          this.form.email,
          this.form.password,
          this.form.username,
          this.form.birthDate,
          this.form.role,
          this.form.category,
          this.form.subcategory,
          this.form.description,
          this.form.userPicture,
          this.form.backgroundPicture
        )
        .subscribe(
          (response) => {
            this.router.navigateByUrl('/interesse');
            return response;
          },
          (err) => {
            throw err;
          }
        );
    } else {
      this.invalidField = true;
    }
  }
}

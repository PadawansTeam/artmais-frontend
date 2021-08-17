import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../service/cadastro.service';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { LoginService } from 'src/app/login/service/login.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

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
  formCadastro!: FormGroup;
  socialUser: SocialUser = new SocialUser();
  isLoggedin: boolean = false;
  loaderOn: boolean = false;

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

    this.formCadastro = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Zà-úÀ-Ú]{4,}(?: [a-zA-Zà-úÀ-Ú]+){0,2}$'),
        ])
      ),
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9.-_$@*!]{3,30}$'),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
        ])
      ),
    });
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
    this.loaderOn = true

    if (this.form.category === null || this.form.category === "") {
      this.form.subcategory = "Consumidor";
      this.form.category = "Consumidor";
    }
    else {
      this.form.subcategory = this.form.category.split("_")[1];
      this.form.category = this.form.category.split("_")[0];
    }
    this.form.userPicture =
      'https://bucket-artmais.s3.amazonaws.com/default-image/defaultProfile.png';
    this.form.backgroundPicture =
      'https://bucket-artmais.s3.amazonaws.com/default-image/defaultBackground.png';
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
            localStorage.setItem('token', response.token);
            this.loaderOn = false;
            this.router.navigateByUrl('/interesse');
            return response;
          },
          (err) => {
            this.loaderOn = false;
            throw err;
          }
        );
    } else {
      this.loaderOn = false;
      this.invalidField = true;
    }
  }
}

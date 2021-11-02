import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/cadastro/service/cadastro.service';
import { CadastroOAuthService } from '../service/cadastro-oauth.service';
import { Router } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-oauth.component.html',
  styleUrls: ['./cadastro-oauth.component.css'],
})
export class CadastroOAuthComponent implements OnInit {
  public externalAuthorizationId = localStorage.getItem(
    'externalAuthorizationId'
  );

  public email = localStorage.getItem('email');

  form: any = {
    name: null,
    username: null,
    birthDate: null,
    category: null,
    subcategory: null,
    description: null,
    userPicture: null,
    backgroundPicture: null,
  };
  errorMessage = '';
  redirectTo: string = '';
  arraySelect: any[] = [];
  isArtist = false;
  isClient = false;
  invalidField = false;
  formCadastro!: FormGroup;

  constructor(
    private cadastroService: CadastroService,
    private cadastroOAuthService: CadastroOAuthService,
    private router: Router,
    private formBuilder: FormBuilder
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
          Validators.pattern('^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$'),
        ])
      ),
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9.-_$@*!]{3,30}$'),
        ])
      ),
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
    if (this.form.category === null || this.form.category === '') {
      this.form.subcategory = 'Consumidor';
      this.form.category = 'Consumidor';
    } else {
      this.form.subcategory = this.form.category.split('_')[1];
      this.form.category = this.form.category.split('_')[0];
    }
    this.form.userPicture =
      'https://bucket-artmais.s3.amazonaws.com/default-image/defaultProfile.png';
    this.form.backgroundPicture =
      'https://bucket-artmais.s3.amazonaws.com/default-image/defaultBackground.png';
    this.form.description = 'Olá! Sou novo na plataforma Art+!';
    if (
      this.form.name &&
      this.form.username &&
      this.form.birthDate &&
      this.form.category &&
      this.form.subcategory &&
      this.form.description
    ) {
      this.cadastroOAuthService
        .signUp(
          this.externalAuthorizationId,
          this.form.name,
          this.email,
          this.form.username,
          this.form.birthDate,
          this.form.category,
          this.form.subcategory,
          this.form.description,
          this.form.userPicture,
          this.form.backgroundPicture
        )
        .subscribe(
          (response) => {
            localStorage.setItem('token', response.token);
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

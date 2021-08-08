import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../service/cadastro.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
    backgroundPicture: null
  };
  errorMessage = '';
  redirectTo: string = '';
  roles: string[] = [];
  arraySelect: any[] = [];
  isArtist = false;
  isClient = false;
  invalidField = false;
  formCadastro!: FormGroup;

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formCadastro = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$')
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.\-_$@*!]{3,30}$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])),
    });    
    this.cadastroService.getAll().subscribe(
      (response) => {
        this.arraySelect = response;
      },
    );
  }

  public checkIsClient() {
    this.isClient = true
    this.isArtist = false
    return
  }

  public checkIsArtist() {
    this.isArtist = true
    this.isClient = false
    return
  }

  public cadastroArtPlus() {

    if (this.form.category === null || this.form.category === "") {
      this.form.subcategory = "Consumidor";
      this.form.category = "Consumidor";
    }
    else {
      this.form.subcategory = this.form.category.split("_")[1];
      this.form.category = this.form.category.split("_")[0];
    }
    this.form.userPicture = "https://artplus-bucket.s3.amazonaws.com/profile_pic/default.png";
    this.form.backgroundPicture = "https://artplus-bucket.s3.amazonaws.com/background_pic/default.png";
    this.form.description = "Olá! Sou novo na plataforma Art+!";
    if (this.form.name && this.form.email && this.form.password && this.form.username && this.form.birthDate && this.form.role && this.form.category && this.form.subcategory && this.form.description) {
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
        ).subscribe(
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

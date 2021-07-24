import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../service/cadastro.service';
import { Router } from '@angular/router';

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
    description: null
  };
  errorMessage = '';
  redirectTo: string = '';
  roles: string[] = [];
  arraySelect: any[] = [];
  isArtist = false;
  isClient = false;
  invalidField = false;

  constructor(
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cadastroService.getAll().subscribe(
      (response) => {
        this.arraySelect = response;
      },
    )
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
    this.form.description = " ";
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
          this.form.description
        ).subscribe(
          (response) => {
            this.router.navigateByUrl('/homepage');
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

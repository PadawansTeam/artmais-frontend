import { Component } from '@angular/core';
import { CadastroService } from '../service/cadastro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  form: any = {
    name: null,
    surname: null,
    socialName: null,
    email: null,
    password: null,
  };
  errorMessage = '';
  redirectTo: string = '';
  roles: string[] = [];

  constructor(
    private cadastroService: CadastroService,
    private router: Router
  ) {}

  public cadastroArtPlus() {
    this.cadastroService
      .signUp(
        this.form.name,
        this.form.surname,
        this.form.socialName,
        this.form.email,
        this.form.password
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response != null) {
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

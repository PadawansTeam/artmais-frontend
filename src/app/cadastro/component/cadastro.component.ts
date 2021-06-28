import { Component } from '@angular/core';
import { CadastroService } from '../service/cadastro.service';

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

  constructor(private cadastroService: CadastroService) {}

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
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }
}

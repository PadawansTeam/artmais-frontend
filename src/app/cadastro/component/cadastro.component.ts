import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cadastro } from '../service/cadastro';
import { CadastroService } from '../service/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  dataSaved = false;  
  cadastroForm: any;  
  cadastroIdUpdate!: string | null;  
  message: string | undefined;
  allCadastros!: Observable<Cadastro[]>;  

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
    private formbulider: FormBuilder
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formbulider.group({  
      Nome: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
    });  
    this.loadAllCadastro();  
  }

  loadAllCadastro() {  
    this.allCadastros = this.cadastroService.getAllCadastro();  
  } 
  onFormSubmit() {  
    this.dataSaved = false;  
    const cadastro = this.cadastroForm.value;  
    this.Createcadastro(cadastro);  
    this.cadastroForm.reset();  
  } 

  Createcadastro(cadastro: Cadastro) {  
    if (this.cadastroIdUpdate == null) {  
      this.cadastroService.createcadastro(cadastro).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Registro salvo com sucesso';  
          this.loadAllCadastro();  
          this.cadastroIdUpdate = null;  
          this.cadastroForm.reset();  
        }  
      );  
    } else {  
      cadastro.cadastroId = this.cadastroIdUpdate;  
      this.cadastroService.updatecadastro(this.cadastroIdUpdate,cadastro).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Registro atualizado com sucesso';  
        this.loadAllCadastro();  
        this.cadastroIdUpdate = null;  
        this.cadastroForm.reset();  
      });  
    }  
  }  

  resetForm() {  
    this.cadastroForm.reset();  
    this.message = undefined;  
    this.dataSaved = false;  
  } 
}

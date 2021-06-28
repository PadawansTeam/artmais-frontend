import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/component/cadastro.component';
import { InicioComponent } from './inicio/component/inicio.component';
import { LoginComponent } from './login/component/login.component';
import { TesteComponent } from './teste/component/teste.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'teste', component: TesteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

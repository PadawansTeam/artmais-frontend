import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/component/cadastro.component';
import { ConstrucaoComponent } from './construcao/component/construcao.component';
import { ErroComponent } from './erro/component/erro.component';
import { HomepageComponent } from './homepage/component/homepage.component';
import { InicioComponent } from './inicio/component/inicio.component';
import { LoginComponent } from './login/component/login.component';
import { PlanosComponent } from './planos/componet/planos.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'erro', component: ErroComponent },
  { path: 'construcao', component: ConstrucaoComponent },
  { path: 'planos', component: PlanosComponent },
  { path: 'homepage', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

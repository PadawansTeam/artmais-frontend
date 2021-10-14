import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistaComponent } from './artista/component/artista.component';
import { CadastroComponent } from './cadastro/component/cadastro.component';
import { CadastroOAuthComponent } from './cadastroOauth/component/cadastro-oauth.component';
import { ConfiguracaoComponent } from './configuracao/component/configuracao.component';
import { ConstrucaoComponent } from './construcao/component/construcao.component';
import { DashboardComponent } from './dashboard/component/dashboard.component';
import { ErroComponent } from './erro/component/erro.component';
import { HomepageComponent } from './homepage/component/homepage.component';
import { InicioComponent } from './inicio/component/inicio.component';
import { InteresseComponent } from './interesse/component/interesse.component';
import { LoginComponent } from './login/component/login.component';
import { PerfilComponent } from './perfil/component/perfil.component';
import { PlanosComponent } from './planos/componet/planos.component';
import { PrivacidadeComponent } from './privacidade/component/privacidade.component';
import { UsuariosComponent } from './usuarios/component/usuarios.component';
import { AssinanteprimeComponent } from './assinanteprime/component/assinanteprime.component';
import { TesteComponent } from './teste/component/teste.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/oauth', component: CadastroOAuthComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'erro', component: ErroComponent },
  { path: 'construcao', component: ConstrucaoComponent },
  { path: 'planos', component: PlanosComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'configuracao', component: ConfiguracaoComponent },
  { path: 'interesse', component: InteresseComponent },
  { path: 'artista/:id', component: ArtistaComponent },
  { path: 'pesquisa/:search', component: UsuariosComponent },
  { path: 'privacidade', component: PrivacidadeComponent }, 
  { path: 'assinante', component: AssinanteprimeComponent },
  { path: 'teste', component: TesteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

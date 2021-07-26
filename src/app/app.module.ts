
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroModule } from './cadastro/cadastro.module';
import { LoginModule } from './login/login.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { InicioModule } from './inicio/inicio.module';
import { CommonModule } from '@angular/common';
import { LoginService } from './login/service/login.service';
import { CadastroService } from './cadastro/service/cadastro.service';
import { ErroModule } from './erro/erro.module';
import { ConstrucaoModule } from './construcao/construcao.module';
import { SwiperModule } from 'swiper/angular';
import { HomepageModule } from './homepage/homepage.module';
import { PlanosModule } from './planos/planos.module';
import { HeaderlogModule } from './headerlog/headerlog.module';
import { PerfilModule } from './perfil/perfil.module';
import { DashboardModule } from './dashboard/dashboad.module';
import { InteresseModule } from './interesse/interesse.module';
import { ConfiguracaoModule } from './configuracao/configuracao.module';
import { RecommendationService } from './homepage/service/recommendation.service';
import { ArtistaModule } from './artista/artista.module';
import { InteresseService } from './interesse/service/interesse.service';
import { PerfilService } from './perfil/service/perfil.service';
import { ArtistaService } from './artista/service/artista.service';
// import { ConfiguracaoService } from './configuracao/service/configuracao.service';



export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LoginModule,
    CadastroModule,
    HeaderModule,
    FooterModule,
    InicioModule,
    ErroModule,
    SwiperModule,
    ConstrucaoModule,
    HomepageModule,
    PlanosModule,
    HeaderlogModule, 
    PerfilModule,
    DashboardModule,
    InteresseModule,
    ConfiguracaoModule,
    ArtistaModule
  ],
  providers: [
    TranslateService, 
    LoginService, 
    CadastroService, 
    RecommendationService, 
    InteresseService, 
    PerfilService, 
    ArtistaService,
    // ConfiguracaoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

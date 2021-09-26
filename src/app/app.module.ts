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
import { CadastroOAuthModule } from './cadastroOauth/cadastro-oauth.module';
import { LoginModule } from './login/login.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { InicioModule } from './inicio/inicio.module';
import { CommonModule } from '@angular/common';
import { LoginService } from './login/service/login.service';
import { CadastroService } from './cadastro/service/cadastro.service';
import { CadastroOAuthService } from './cadastroOauth/service/cadastro-oauth.service';
import { SwiperModule } from 'swiper/angular';
import { HomepageModule } from './homepage/homepage.module';
import { HeaderlogModule } from './headerlog/headerlog.module';
import { PerfilModule } from './perfil/perfil.module';
import { RecommendationService } from './homepage/service/recommendation.service';
import { ArtistaModule } from './artista/artista.module';
import { PerfilService } from './perfil/service/perfil.service';
import { ArtistaService } from './artista/service/artista.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ErroModule } from './erro/erro.module';
import { PlanosModule } from './planos/planos.module';
import { ConfiguracaoModule } from './configuracao/configuracao.module';
import { ConfiguracaoService } from './configuracao/service/configuracao.service';
import { ReactiveFormsModule } from '@angular/forms';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ConstrucaoModule } from './construcao/construcao.module';
import { DashboardModule } from './dashboard/dashboad.module';
import { InteresseModule } from './interesse/interesse.module';
import { InteresseService } from './interesse/service/interesse.service';
import { PrivacidadeModule } from './privacidade/privacidade.module';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
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
    CadastroOAuthModule,
    HeaderModule,
    FooterModule,
    InicioModule,
    ErroModule,
    SwiperModule,
    ConstrucaoModule,
    HomepageModule,
    PlanosModule,
    HeaderlogModule,
    UsuariosModule,
    PerfilModule,
    DashboardModule,
    InteresseModule,
    ConfiguracaoModule,
    ArtistaModule,
    PrivacidadeModule
  ],
  providers: [
    TranslateService,
    LoginService,
    CadastroService,
    CadastroOAuthService,
    RecommendationService,
    InteresseService,
    PerfilService,
    ArtistaService,
    ConfiguracaoService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '891131493527-nqi3qkvomv8j9hio1vanpq4qkp6dvmoa.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

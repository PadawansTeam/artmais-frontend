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
import { TesteModule } from './teste/teste.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { CommonModule } from '@angular/common';

import { LoginService } from './login/service/login.service';
import { CadastroService } from './cadastro/service/cadastro.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
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
    TesteModule,
    HeaderModule,
    FooterModule,
  ],
  providers: [TranslateService, LoginService, CadastroService],
  bootstrap: [AppComponent],
})
export class AppModule {}

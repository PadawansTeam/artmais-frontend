import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from '../select/select.module';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderlogModule } from '../headerlog/headerlog.module';
import { ConfiguracaoComponent } from './component/configuracao.component';
import { ConfiguracaoService } from './service/configuracao.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderUserComumModule } from '../headerusercomum/headerusercomum.module';
import { RecommendationService } from '../homepage/service/recommendation.service';
import { DatePipe } from '@angular/common';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ConfiguracaoComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SelectModule,
    HeaderlogModule,
    HeaderUserComumModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TranslateService, ConfiguracaoService, RecommendationService, DatePipe
  ],
  bootstrap: []
})
export class ConfiguracaoModule { }

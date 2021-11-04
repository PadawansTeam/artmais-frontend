import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from '../select/select.module';
import { HeaderlogModule } from '../headerlog/headerlog.module';
import { HeaderUserComumModule } from '../headerusercomum/headerusercomum.module';
import { FooterModule } from '../footer/footer.module';
import { PagamentoplanosComponent } from './component/pagamentoplanos.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    PagamentoplanosComponent,
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
    HeaderUserComumModule,
    FooterModule,
    HeaderlogModule
  ],
  providers: [
    TranslateService],
  bootstrap: []
})
export class PagamentoplanosModule { }
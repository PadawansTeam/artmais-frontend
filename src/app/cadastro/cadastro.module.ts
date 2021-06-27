import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CadastroComponent } from './component/cadastro.component';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectLangComponent } from '../select/component/select.component';
import { SelectModule } from '../select/select.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    CadastroComponent,
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
    SelectModule
  ],
  providers: [
    TranslateService
  ],
  bootstrap: []
})
export class CadastroModule { }

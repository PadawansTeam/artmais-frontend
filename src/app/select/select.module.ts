import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SelectLangComponent } from './component/select.component';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SelectLangComponent
  ],
  exports: [
    SelectLangComponent,
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
  ],
  providers: [
    TranslateService
  ],
  bootstrap: []
})
export class SelectModule { }

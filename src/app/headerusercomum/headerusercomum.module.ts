import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from '../select/select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderusercomumComponent } from './component/headerusercomum.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HeaderusercomumComponent,
  ],
  exports: [
    HeaderusercomumComponent,
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
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TranslateService
  ],
  bootstrap: []
})
export class HeaderusercomumModule { }

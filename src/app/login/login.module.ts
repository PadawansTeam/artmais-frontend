import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './component/login.component';
import { HttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from '../select/select.module';
import { LoginService } from './service/login.service';
import { Login } from './service/login';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SelectModule,
    HeaderModule,
    FooterModule,
  ],
  providers: [TranslateService, LoginService],
  bootstrap: [],
})
export class LoginModule {}

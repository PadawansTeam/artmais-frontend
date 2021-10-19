import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from '../select/select.module';
import { TesteComponent } from './component/teste.component';
import { HeaderlogModule } from '../headerlog/headerlog.module';
import { HeaderusercomumModule } from '../headerusercomum/headerusercomum.module';
import { FooterModule } from '../footer/footer.module';
import { RecommendationService } from './service/recommendation.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    TesteComponent,
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
    HeaderusercomumModule,
    FooterModule
  ],
  providers: [
    TranslateService, RecommendationService],
  bootstrap: []
})
export class TesteModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from '../select/select.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderlogModule } from '../headerlog/headerlog.module';
import { UsuariosComponent } from './component/usuarios.component';
import { HeaderUserComumModule } from '../headerusercomum/headerusercomum.module';
import { RecommendationService } from '../homepage/service/recommendation.service';



export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    UsuariosComponent
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
    FooterModule
  ],
  providers: [ TranslateService, RecommendationService ],
  bootstrap: []
})
export class UsuariosModule { }

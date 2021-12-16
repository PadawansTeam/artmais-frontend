import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from '../select/select.module';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderlogModule } from '../headerlog/headerlog.module';
import { ArtistaComponent } from './component/artista.component';
import { ArtistaService } from './service/artista.service';
import { PerfilService } from '../perfil/service/perfil.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RecommendationService } from '../homepage/service/recommendation.service';
import { HeaderUserComumModule } from '../headerusercomum/headerusercomum.module';
import { NgxVideoListPlayerModule } from 'ngx-video-list-player';
import { YouTubePlayerModule } from '@angular/youtube-player';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    ArtistaComponent
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
    HeaderModule,
    FooterModule,
    NgbModule,
    RouterModule,
    HeaderUserComumModule,
    NgxVideoListPlayerModule,
    YouTubePlayerModule
  ],
  providers: [
    TranslateService,
    ArtistaService,
    RecommendationService
  ],
  bootstrap: []
})
export class ArtistaModule { }

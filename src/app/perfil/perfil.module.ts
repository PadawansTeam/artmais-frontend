import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectModule } from '../select/select.module';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderlogModule } from '../headerlog/headerlog.module';
import { PerfilComponent } from './component/perfil.component';
import { PerfilService } from './service/perfil.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxVideoListPlayerModule } from 'ngx-video-list-player';
import { YouTubePlayerModule } from '@angular/youtube-player';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SelectModule,
    HeaderlogModule,
    FooterModule,
    NgbModule,
    RouterModule,
    NgxVideoListPlayerModule,
    YouTubePlayerModule
  ],
  providers: [
    TranslateService,
    PerfilService
  ],
  bootstrap: []
})
export class PerfilModule { }

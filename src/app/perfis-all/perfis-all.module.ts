import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfisAllComponent } from './component/perfis-all.component';
import { FooterModule, HttpLoaderFactory } from '../footer/footer.module';
import { HeaderlogModule } from '../headerlog/headerlog.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SelectModule } from '../select/select.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderlogModule,
    FooterModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    SelectModule
  ],
  declarations: [PerfisAllComponent]
})
export class PerfisAllModule { }

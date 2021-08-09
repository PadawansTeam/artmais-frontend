import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './component/usuarios.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderlogModule } from '../headerlog/headerlog.module';
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
  declarations: [UsuariosComponent]
})
export class UsuariosModule { }

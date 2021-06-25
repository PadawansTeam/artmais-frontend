import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroModule } from './cadastro/cadastro.module';
import { LoginModule } from './login/login.module';
import { TesteModule } from './teste/teste.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CadastroModule,
    TesteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

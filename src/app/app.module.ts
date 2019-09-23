import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';

import { AppComponent } from './app.component';
import { CaixaDeEntradaModule } from './modules/caixa-de-entrada/caixa-de-entrada.module';
import { ModuloRoteamento } from 'src/app.routes';
import { SharedComponentsModule } from './components/shared-components.module';
import { CadastroModule } from './modules/cadastro/cadastro.module';
import { LoginModule } from './modules/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CaixaDeEntradaModule,
    SharedComponentsModule,
    CadastroModule,
    LoginModule,
    ModuloRoteamento
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

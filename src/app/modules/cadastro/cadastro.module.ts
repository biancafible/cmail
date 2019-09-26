import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroService } from 'src/app/services/cadastro.service';

@NgModule({
  declarations: [CadastroComponent],
  exports: [CadastroComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CadastroRoutingModule
    
  ],
  providers: [CadastroService]
})
export class CadastroModule { }

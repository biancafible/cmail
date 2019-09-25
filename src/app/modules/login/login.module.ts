import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  exports: [LoginComponent]
})
export class LoginModule { }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginOutput } from 'src/app/models/dto/login-output';

@Component({
  selector: 'cmail-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  private validadoresPassword = Validators.compose([
    Validators.required,
    Validators.maxLength(255)
  ]);


  private validadoresEmail = Validators.compose([
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(255)
  ]);

  public email = new FormControl ('', this.validadoresEmail);
  public password = new FormControl ('', this.validadoresPassword);
  

  formLogin = new FormGroup({
    email: this.email,
    password: this.password,

  })

  login = {
    email: this.email.value,
    password: this.password.value
  }

  

  constructor(private httpClient: HttpClient, private roteador: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  handleLogin(){
    if(this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    console.log(this.login);

    this.loginService
        .autenticar(this.formLogin.value)
        .subscribe((response: LoginOutput) => {
            console.log(response);
            console.log('deu certo');
          }, (error) =>{
            console.error(error);
            console.log('deu ruim');
                        
          },
          () => {
            setTimeout(() => {
            this.roteador.navigate(['inbox']);
            }, 3000);
          }         
        );

  }

}

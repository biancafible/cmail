import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  

  constructor(private httpClient: HttpClient, private roteador: Router) { }

  ngOnInit() {
  }

  handleLogin(formLogin: NgForm){
    if(this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }
    console.log(this.login);

    this.httpClient
        .post('http://localhost:3200/login', this.formLogin.value)
        .subscribe((response: any) => {
            console.log(response);
            console.log('deu certo');
            localStorage.setItem('cmail-token', response.token)
    
            
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

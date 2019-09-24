import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserInputDTO } from './user-input';
import { Router } from '@angular/router';

@Component({
  selector: 'cmail-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {
  
  mensagem ="";

  private validatoresNome = Validators.compose([
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(255),
    Validators.pattern('[a-zA-Z\u00C0-\u00FF ]+')
  ]);

  private validadoresUsername = Validators.compose([
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(255),
    Validators.pattern('[a-z0-9]+')
  ]);

  private validadoresSenha = Validators.compose([
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(255)
  ]);

  private validadoresTelefone = Validators.compose([
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(9),
    Validators.pattern(/^\d{8,9}$/)
  ]);

  public nome = new FormControl ('', this.validatoresNome);
  public username = new FormControl ('', this.validadoresUsername);
  public senha = new FormControl ('', this.validadoresSenha);
  public telefone = new FormControl ('', this.validadoresTelefone);
  public avatar = new FormControl('', Validators.required, this.validaImagem.bind(this));

  formCadastro = new FormGroup({
    nome: this.nome,
    username: this.username,
    senha: this.senha,
    avatar: this.avatar,
    telefone: this.telefone

  })

  constructor(private httpRequest: HttpClient, private roteador: Router) { }

  ngOnInit() {
  }

  validaImagem(){
    return this.httpRequest
              .get(this.avatar.value, {observe: "response"}).pipe()
  }

  handleCadastro(){

   if(this.formCadastro.invalid){
     return;
   }

    const userDTO = new UserInputDTO(this.formCadastro.value);

    console.log(userDTO);



    this.httpRequest
        .post('http://localhost:3200/users', userDTO)
        .subscribe(
          resposta => {
            console.log(resposta);
            this.mensagem = "Cadastro feito com sucesso!"
            this.formCadastro.reset();
          }, (erro: HttpErrorResponse) =>{
            this.mensagem = erro.error.body[0].message;
          }
          ,() => {
            setTimeout(() => {
            this.roteador.navigate(['login']);
            }, 3000);
          }
        );
    
  }

}

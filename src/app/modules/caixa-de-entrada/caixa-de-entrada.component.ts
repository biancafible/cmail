import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';


@Component({
  selector: 'cmail-caixa-de-entrada',
  templateUrl: './caixa-de-entrada.component.html',
  styles: [ `ul, li{
    margin: 0;
    padding: 0;
    list-style-type: none;
  }`
  ]
})
export class CaixaDeEntradaComponent implements OnInit {

  constructor(private emailService: EmailService) { }

  ngOnInit() {

    this.emailService
      .listar()
      .subscribe((listaEmailApi) => {
        this.listaEmail = listaEmailApi;
      }), erro => console.log(erro);
      
  }
  email={
    destinatario:'',
    assunto:'',
    conteudo:''
  }

  listaEmail = []
  private _isNewEmailOpen = false

  get isNewEmailOpen(){
    return this._isNewEmailOpen;
  }

  toggleNewEmail(){
      this._isNewEmailOpen = !this.isNewEmailOpen
  }

  handleNewEmail(formEmail: NgForm){

    if(formEmail.invalid){
      formEmail.control.markAllAsTouched();
      return;

    }     
    
    this.emailService
        .enviar(this.email).subscribe(
          (resposta) => {
            console.log('deu certo', resposta);

            this.listaEmail.push({
              destinatario: resposta.to,
              assunto: resposta.subject,
              conteudo: resposta.content
            });

            formEmail.resetForm();
            
          }
          , (erro) => {
            console.log('deu ruim', erro);
            
          }
        )
      
  }

}

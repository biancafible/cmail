import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { PageDataService } from 'src/app/services/page-data.service';
import { HeaderDataService } from 'src/app/services/header.services';


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

  constructor(private emailService: EmailService,
              private pageDataService: PageDataService,
              private headerService: HeaderDataService) { }

  ngOnInit( ) {
  

    this.headerService
        .valorDoFiltro
        .subscribe(novoValor => this.headerService.atualizarTermoFiltro = novoValor)

    this.emailService
      .listar()
      .subscribe((listaEmailApi) => {
        this.listaEmail = listaEmailApi;
      }), erro => console.log(erro);
      
      this.pageDataService
      .atualizarTitulo('Caixa de Entrada - Cmail')
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

  handleRemoveEmail(eventoVaiRemover, emailId){
   console.log(eventoVaiRemover);
   
   if(eventoVaiRemover.status === 'removing'){
     this.emailService
          .deletar(emailId)
          .subscribe(
            res => {
              console.log(res);

              this.listaEmail = this.listaEmail.filter(email => email.id != emailId)
          
            }
            ,err => console.log(err)
            
          )
   }
  }

}

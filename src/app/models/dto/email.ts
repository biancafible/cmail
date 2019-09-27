import { EmailOutput } from './email-output';

export class Email {
    assunto = "";
    conteudo = "";
    dataEnvio =  "";
    destinatario = "";
    id = "";
    remetente = "";

    
    constructor(emailIngles: EmailOutput){
        this.assunto = emailIngles.subject;
        this.conteudo = emailIngles.content;
        this.dataEnvio = emailIngles.updated_at;
        this.destinatario = emailIngles.to;
        this.id =  emailIngles.id;
        this.remetente = emailIngles.from;
    }
    get introducaoDoConteudo(){
        return this.conteudo.substr(0, 140)+'...'
    }
}
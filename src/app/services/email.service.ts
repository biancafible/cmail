import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { EmailForm } from '../models/dto/email-form';
import { EmailInput } from '../models/dto/email-input';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailOutput } from '../models/dto/email-output';
import { map } from 'rxjs/operators';
import { Email } from '../models/dto/email';


@Injectable()
export class EmailService{


    private url = environment.api+'emails/';
    private headerOptions ={
        headers: new HttpHeaders({'Authorization': localStorage.getItem('cmail-token')})
    }

    constructor(private http: HttpClient){

    }

    

    enviar(email: EmailForm): Observable<EmailOutput> {

        const emailDTO: EmailInput = {
            to: email.destinatario,
            subject: email.assunto,
            content: email.conteudo
        }
        
        return this.http.post<EmailOutput>(this.url,emailDTO,this.headerOptions)
    }



    listar(): Observable<Email[]>{
        return this.http
                    .get<EmailOutput[]>(this.url,this.headerOptions)
                    .pipe(
                        map(
                            (listaEmailIngles) => {
                                
                                return listaEmailIngles.map(
                                    emailIngles => {
                                        return new Email(emailIngles);
                                    }
                                )
                            }
                        )
                    )
    }

    deletar(id){
        return this
                .http
                .delete(this.url+id, this.headerOptions)
        
    }
    
}
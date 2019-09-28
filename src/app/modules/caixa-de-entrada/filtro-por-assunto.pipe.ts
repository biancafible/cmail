import { PipeTransform, Pipe } from '@angular/core';
import { pipe } from 'rxjs';
import { Email } from 'src/app/models/dto/email';

@Pipe({
    name: 'filtroPorAssunto'
})
export class FiltroPorAssunto implements PipeTransform{

    transform(listaEmails: Email[], termoFiltro: string){
        return listaEmails
                .filter(
                    email =>
                        email.assunto.toLowerCase()
                        .includes(termoFiltro.toLowerCase())
                )
    }
}
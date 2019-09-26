import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { CadastroInput } from '../models/dto/cadastro-input';
import { Injectable } from '@angular/core';

@Injectable()
export class CadastroService{
    
    private url = environment.api+'users/';

    constructor (private http: HttpClient){}

    autenticar (cadastroData: CadastroInput){

        const cadastroDto: CadastroInput = {
            name: cadastroData.name,
            username: cadastroData.username,
            phone: cadastroData.phone,
            password: cadastroData.password,
            avatar: cadastroData.avatar
        } 
        return  this.http
        .post(this.url, cadastroDto)
    }

}
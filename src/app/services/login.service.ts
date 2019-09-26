import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { LoginInput } from '../models/dto/login-input';
import { map } from 'rxjs/operators';

@Injectable()

export class LoginService {

    private url = environment.api+'login/';

    constructor(private http: HttpClient){}

    autenticar (loginData: LoginInput) {

    const loginDto: LoginInput = {
        email: loginData.email,
        password: loginData.password
    }
        return this.http
         .post(this.url, loginDto)
         .pipe(
             map((response:any) => {
                localStorage.setItem('TOKEN', response.token)
                return response;
             }
                )
         )
    }
}  
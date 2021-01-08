import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LoginInterface } from '../interface/login.interface';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({ providedIn: 'root' })

export class AuthService {

    constructor(private http: HttpClient) { }

    singIn(login: LoginInterface) {
        return this.http.post(`${environment.api_url}/autentication`, login);
    }

    public getToken(): Token {
        return JSON.parse(localStorage.getItem("@CLAuth:token"));
    }

}
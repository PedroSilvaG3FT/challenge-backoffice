import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class ParamsService {

    constructor(private datePipe: DatePipe) { }

    private criarComArray(array: any[], key: string): string {
        var ret = [];
        for (var d in array) {
            ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[d]));
        }
        return ret.join('&');
    }

    public criarUrl(variavel: any, nomeParametro: string): any {
        var ret = [];
        if (variavel === null) {
            return;
        }
        if (variavel instanceof Array) {
            ret.push(this.criarComArray(variavel, nomeParametro));
        }
        else {
            for (var propriedade in variavel) {
                var nome = propriedade;
                if (nomeParametro) {
                    nome = nomeParametro + '.' + propriedade;
                }
                if (variavel[propriedade] === null) {
                    continue;
                }
                if (variavel[propriedade] instanceof Date) {
                    ret.push(encodeURIComponent(nome) + '=' + encodeURIComponent(this.datePipe.transform(variavel[propriedade], 'yyyy-MM-dd')));
                }
                else if (variavel[propriedade] instanceof Object) {
                    var retorno = this.criarUrl(variavel[propriedade], nome);
                    if (retorno) {
                        ret.push(retorno);
                    }
                } else {
                    ret.push(encodeURIComponent(nome) + '=' + encodeURIComponent(variavel[propriedade]));
                }
            }
        }
        if (ret.length === 0) {
            return null;
        }
        return ret.join('&');
    }
}
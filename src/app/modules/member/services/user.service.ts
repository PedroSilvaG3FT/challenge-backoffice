import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsService } from 'app/shared/services/params-service.service';
import { environment } from 'environments/environment';
import { MemberInterface } from '../interfaces/member.interface'
@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private http: HttpClient,
        private paramsService: ParamsService
    ) { }

    getAll(params?) {
        const dataFiltro = '?' + this.paramsService.criarUrl(params, '');
        return this.http.get<any[]>(`${environment.api_url}/user${dataFiltro}`)
    }

    getById(id: number) {
        return this.http.get<MemberInterface>(`${environment.api_url}/user/${id}/`)
    }

    update(user: any) {
        return this.http.put(`${environment.api_url}/user`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.api_url}/user/${id}`)
    }

    reprove(id: number) {
        return this.http.delete(`${environment.api_url}/user/reprove/${id}`)
    }

    createCurrentWeight(data) {
        return this.http.post(`${environment.api_url}/userWeight`, data)
    }
}
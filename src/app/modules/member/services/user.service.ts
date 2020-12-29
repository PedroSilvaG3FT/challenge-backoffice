import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MemberInterface } from '../interfaces/member.interface'
@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.api_url}/user/`)
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
}